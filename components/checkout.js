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

export default function Checkout({ navigation }) {
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
          console.log(`${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
          navigation.replace("OrderSearch");
        }
      };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);

    const payWithDT = () => {  
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
          dispatch(setDEATSTokens(data.user.DEATS_tokens))

          if (data.succeeded == true) {
              const order_id = data.order.order_id

              joinRoomForOrder(order_id)

              dispatch(setOrderId(order_id))
              dispatch(setOrderFee(data.order.order_fee))

              navigation.replace('OrderSearch') 

          } else if (data.order) {
            Alert.alert(
              "Insuficient DEATS Tokens (DT)",
              `This order costs ${data.order.order_fee.toFixed(2)} DT, but you have only ${data.user.DEATS_tokens.toFixed(2)} DT left in your account. Here's what you can do`,
              [
                {
                  text: "Pay with card instead", 
                  onPress: () => {
                    openPaymentSheet()
                  }
                }, 
                { 
                  text: "Buy some DT first", 
                  onPress: () => navigation.navigate("BuyTokens")
                }, 
                {
                  text: "Update the order",
                  onPress: () => navigation.navigate("OrderSelection"),
                  
                },
                {
                  text: "Earn some DT by making a delivery", 
                  onPress: () => navigation.navigate("DeliverySelection"),
                  
                },
              ],
              { cancelable: false });
          }
      })
      .catch(err => console.error(err));
    }

    return (
      <Screen>
        <PaymentButton title="Pay with DeatsTokens" loading={loading} action={payWithDT}/>
        <PaymentButton title="Pay with Card" loading={loading} action={openPaymentSheet}/>
      </Screen>
    );
  }


const PaymentButton = ({ title, loading, action }) => (
  <Button
        variant="primary"
        containerStyle={{ 
          borderColor: "green", 
          borderWidth: 2,
          borderRadius: 15,
          backgroundColor: "green", 
          margin: 40,
          marginBottom: 0,
        }}
        buttonStyle={{
          backgroundColor: "green",
        }}
        disabled={!loading}
        title={title}
        onPress={action}
  />
)

const BottomModal = ({ children, openPaymentSheet }) => (
  <Modal
        animationType="slide" 
        visible={modalVisible} 
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
    >
        <View style={styles.bottomView}>
            <View style={styles.modalViewPayment}>
            <View style={styles.modalTextPayment}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'black',
                    }}
                >You don't have enough DT to make this order</Text>
            </View>
            <BottomModalPressable text="Pay with Card" action={openPaymentSheet}/>
            <BottomModalPressable text="Buy some DT First" action={openPaymentSheet}/>
            <BottomModalPressable text="Earn DT for the future through making deliveries"/>
            <Pressable
                onPress={() => {setModalVisible(false)}}
            >
                <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 22, fontSize: 18}}>Cancel the order</Text>
            </Pressable>
            </View>
        </View>
    </Modal>
)

const BottomModalPressable = ({ text, action }) => (
  <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={() => {
        action()
        setModalVisible(false)
      }}
  >
      <Text style={styles.textModalPayment}>{text}</Text>
  </Pressable>
)
