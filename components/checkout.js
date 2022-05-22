import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button } from "react-native-elements";

import { Screen } from "react-native-screens";
import { DEATS_SERVER_URL, ROUTE_CHECKOUT } from "../utils/Constants";

export default function Checkout() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
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
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: false,  // don't handle payment methods that complete payment after a delay, like SEPA Debit and Sofort
            onPaymentSuccess: (customerId) => {
                console.log("Payment Successful");
                console.log(customerId);
            }
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
  
    return (
      <Screen>
        <Button
          variant="primary"
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </Screen>
    );
  }