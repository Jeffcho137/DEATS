import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput, Pressable, Modal } from "react-native";
import styles from "../style";
import { useSelector } from "react-redux";
import { selectOrderId, selectDropLocation } from "../redux/slices/orderDeliverySlice";
import { selectId, selectName, selectEmail, selectPhoneNum } from "../redux/slices/userSlice";
import { useClientSocket } from "./client_socket";

export function Order_review({ navigation }) {
  const orderId = useSelector(selectOrderId);
  const user_id = useSelector(selectId);

  const [joinRoomForOrder] = useClientSocket({
    userId: user_id,
    orderId: orderId,
    enabled: Boolean(user_id),
  });
  joinRoomForOrder(orderId);
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const phone = useSelector(selectPhoneNum);
  const drop_loc = useSelector(selectDropLocation);

  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [roomEdit, setRoomEdit] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.order_rev}>
        <Text>Name</Text>
        <TextInput
          style={styles.single_input}
          placeholder={`${name}`}
          onChangeText={() => {}}
          editable={nameEdit}
        ></TextInput>
        <Button title="Edit" onPress={() => setNameEdit(true)}></Button>
        <Text>Email</Text>

        <TextInput
          style={styles.single_input}
          placeholder={`${email}`}
          onChangeText={() => {}}
          editable={emailEdit}
        ></TextInput>
        <Button title="Edit" onPress={() => setEmailEdit(true)}></Button>

        <Text>Phone Number</Text>
        <TextInput
          style={styles.single_input}
          placeholder={`${phone}`}
          onChangeText={() => {}}
          editable={phoneEdit}
        ></TextInput>
        <Button title="Edit" onPress={() => setPhoneEdit(true)}></Button>

        <Text>Address</Text>
        <TextInput
          style={styles.single_input}
          placeholder={`${drop_loc ? drop_loc.name : "undefined"}`}
          onChangeText={() => {}}
          editable={false}
        ></TextInput>
        <Button title="Edit" onPress={() => navigation.navigate("MapTest")}></Button>

        <Text>Room Number</Text>
        <TextInput
          style={styles.single_input}
          placeholder={"1234"}
          onChangeText={() => {}}
          editable={roomEdit}
        ></TextInput>
        <Button title="Edit" onPress={() => setRoomEdit(true)}></Button>
      </View>
      <Button
        title="Save"
        onPress={() => {
          navigation.navigate("OrderStatus");
        }}
      ></Button>
      <Button title="Cancel" onPress={() => navigation.navigate("OrderStatus")}></Button>
      <StatusBar style="auto" />
    </View>
  );
}
