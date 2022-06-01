import { useStripe } from "@stripe/stripe-react-native";
import { StackActions } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "react-native-elements";

import { Screen } from "react-native-screens";
import { useDispatch, useSelector } from "react-redux";
import { selectNavigationMode } from "../redux/slices/navigationSlice";
import { selectDropLocation, selectOrderId, selectPickupLocation, setOrderFee, setOrderId } from "../redux/slices/orderDeliverySlice";
import { selectId, setDEATSTokens, setPaymentIntentId } from "../redux/slices/userSlice";
import { DEATS_SERVER_URL, ROUTE_ORDER_DEL_WITH_CARD, ROUTE_ORDER_DEL, ROUTE_UPDATE_ORDER, ROUTE_UPDATE_ORDER_WITH_CARD } from "../utils/Constants";
import { useClientSocket } from "./client_socket";

export default function Checkout({ navigation }) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const userId = useSelector(selectId)
    const orderId = useSelector(selectOrderId)
    const dropLocation = useSelector(selectDropLocation)
    const pickupLocation = useSelector(selectPickupLocation)
    const navigationMode = useSelector(selectNavigationMode)

    console.log("navigationMode", navigationMode)

    const [joinRoomForOrder, joinRoomForPayment] =useClientSocket({
      userId: userId,
      enabled: Boolean(userId)
  })

    const fetchPaymentSheetParams = async () => {
        const response = navigationMode === "updateOrder" ?
        await fetch(`${DEATS_SERVER_URL}${ROUTE_UPDATE_ORDER_WITH_CARD}`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            order: {
              order_id: orderId,
              drop_loc: dropLocation,
              pickup_loc: pickupLocation,
            }
          })
        }) :
        await fetch(`${DEATS_SERVER_URL}${ROUTE_ORDER_DEL_WITH_CARD}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: userId,
              order: {
                  drop_loc: dropLocation,
                  pickup_loc: pickupLocation
              }
          })
        })

        const { paymentIntentId, paymentIntentClientSecret, ephemeralKey, customer, ...data} = await response.json();
        joinRoomForPayment(paymentIntentId)
        dispatch(setPaymentIntentId(paymentIntentId));
        console.log("paymentIntent:", paymentIntentId)
        console.log("server response:", data)
        return {
            paymentIntentClientSecret,
            ephemeralKey,
            customer,
        };
    };
  
    const initializePaymentSheet = async () => {
        const {
            paymentIntentClientSecret,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams().catch((error) => {
            console.log(error);
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
            paymentIntentClientSecret: paymentIntentClientSecret,
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
          Alert.alert('Success', 'Your payment is confirmed!');
          navigationMode === "updateOrder" ? navigation.dispatch(StackActions.pop(2)) : navigation.replace("OrderSearch");
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
              user_id: userId,
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
              const order_id = data?.order?.order_id
              dispatch(setOrderId(order_id))
              dispatch(setOrderFee(data?.order?.order_fee))

              navigation.replace('OrderSearch') 

          } else if (data.order) {
            const msg = `This order costs ${data?.order?.order_fee?.toFixed(2)} DT, but you have only ${data?.user?.DEATS_tokens?.toFixed(2)} DT left in your account. Here's what you can do`
            paymentFailedAlert(msg)
          }
      })
      .catch(err => console.error(err));
    }

    const payUpdateCostWithDT = () => {  
      fetch(`${DEATS_SERVER_URL}${ROUTE_UPDATE_ORDER}`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user_id: userId,
              order: {
                  order_id: orderId,
                  drop_loc: dropLocation,
                  pickup_loc: pickupLocation,
              }
          })
      })
      .then(response => response.json())
      .then((data) => {
          console.log(data)
          if (data.succeeded == true) {
            navigation.dispatch(StackActions.pop(2));

        } else if (data.order) {
          const costDiff = data?.order?.new_order_fee - data?.order?.old_order_fee
          const msg = `This update costs ${costDiff?.toFixed(2)} DT extra, but you have only ${data?.user?.DEATS_tokens?.toFixed(2)} DT left in your account. Here's what you can do`
          paymentFailedAlert(msg)
        }

       })
       .catch(err => console.error(err))
    }

    const paymentFailedAlert = (msg) => {
      Alert.alert(
        "Insuficient DEATS Tokens (DT)",
        msg,
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
        { cancelable: false }
      )
    }

    return (
      <Screen>
        <PaymentButton title="Pay with DeatsTokens" loading={loading} action={navigationMode ? payUpdateCostWithDT : payWithDT}/>
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
