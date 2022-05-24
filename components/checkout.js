import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "react-native-elements";

import { Screen } from "react-native-screens";
import { useDispatch, useSelector } from "react-redux";
import { selectDropLocation, selectPickupLocation, setOrderFee, setOrderId } from "../redux/slices/orderDeliverySlice";
import { selectId, setDEATSTokens } from "../redux/slices/userSlice";
import { DEATS_SERVER_URL, ROUTE_CHECKOUT, ROUTE_ORDER_DEL } from "../utils/Constants";
import { useClientSocket } from "./client_socket";

export default function Checkout() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const user_id = useSelector(selectId)
    const dropLocation = useSelector(selectDropLocation)
    const pickupLocation = useSelector(selectPickupLocation)

    const [joinRoomForOrder] = useClientSocket({
      userId: user_id,
      orderId: null,
      enabled: Boolean(user_id)
  })
  
    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${DEATS_SERVER_URL}${ROUTE_CHECKOUT}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const { paymentIntent, ephemeralKey, customer} = await response.json();
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };
  
    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams().catch(() => {
            Alert.alert(
            "Error",
            "Could not connect to server. Please try again later.",
            [{ text: "OK" }],
            { cancelable: false }
            );
            
            setLoading(false);
        });
        const { error } = await initPaymentSheet({
            merchantDisplayName: "DEATS",
            style: "automatic",
            primaryButtonColor: "#006400", // dark green
            defaultBillingDetails: {
                address: {
                  country: "US",
                },
            },
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: false,  // don't handle payment methods that complete payment after a delay, like SEPA Debit and Sofort
        });
        if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }
      };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);

    const sendOrdererInfo = () => {  
      fetch(`${DEATS_SERVER_URL}${ROUTE_ORDER_DEL}`,
      {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user_id: user_id,
              order: {
                  drop_loc: dropLocation,
                  pickup_loc: pickupLocation
              }
          })
      })
      .then(response => response.json())
      .then((data) => {
          console.log(data)
          if (data.succeeded == true) {
              const order_id = data.order.order_id

              joinRoomForOrder(order_id)

              dispatch(setOrderId(order_id))
              dispatch(setOrderFee(data.order.order_fee))
              dispatch(setDEATSTokens(data.user.DEATS_tokens))

              navigation.navigate('OrderSearch') 

          } else {
              console.log(data.msg);
          }
      })
      .catch(err => console.error(err));
  
    }

    return (
      <Screen>
        <PaymentButton title="Pay with DeatsTokens" loading={loading} action={sendOrdererInfo}/>
        <PaymentButton title="Pay with Card" loading={loading} action={openPaymentSheet}/>

      </Screen>
    );
  }


  const PaymentButton = ({ title, loading, action }) => (
    <Button
          variant="primary"
          containerStyle={{ 
            borderColor: "#006400", // dark green
            borderWidth: 2,
            borderRadius: 15,
            backgroundColor: "#006400", // dark green
            margin: 40,
            marginBottom: 0,
          }}
          buttonStyle={{
            backgroundColor: "#006400", // dark green
          }}
          disabled={!loading}
          title={title}
          onPress={action}
        />
)

