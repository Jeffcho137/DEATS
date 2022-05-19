import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput } from "react-native";
import styles from "../style";
import { useSelector } from "react-redux";
import { selectSelectedCustomer } from "../redux/slices/makeDeliverySlice";

export function Deliver_match(props) {
  const customer = useSelector(selectSelectedCustomer);

  return (
    <View style={styles.container}>
      <View style={styles.order_sel}>
        <Text style={styles.searching_text}>
          Deliver to {customer.order.drop_loc.name} from {customer.order.pickup_loc.name}?
        </Text>
      </View>
      <Button title="Confirm" onPress={() => props.navigation.navigate("DeliverStatus")}></Button>
      <StatusBar style="auto" />
    </View>
  );
}
