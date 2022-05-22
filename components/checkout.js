import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-native";
import { Screen } from "react-native-screens";
import { DEATS_SERVER_URL, ROUTE_CHECKOUT } from "../utils/Constants";

export default function Checkout() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    fetchPaymentParams = () => {
        fetch(`${DEATS_SERVER_URL}${ROUTE_CHECKOUT}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((data) => {
            console.log("server response:", data);
            return data;
        })
        .catch(error => console.log("Initiate payment error: ", error));
    }
  
    const initializePayment = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
      } = await fetchPaymentParams();
  
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true, // handle payment methods that complete payment after a delay, like SEPA Debit and Sofort
      });

      if (!error) {
        setLoading(true);
      }
    };

    const openPayment = async () => {
        const { error } = await presentPaymentSheet();
    
        if (error) {
            console.log("Open payment error:", error);
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
      };

  
    useEffect(() => {
      initializePayment();
    }, []);
  
    return (
      <Screen>
        <Button
          variant="primary"
          disabled={false}
          title="Checkout"
          onPress={openPayment}
        />
      </Screen>
    );
  }