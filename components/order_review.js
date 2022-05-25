import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput, Pressable, Modal } from "react-native";
import styles from "../style";
import { useSelector } from "react-redux";
import { selectOrderId, selectDropLocation } from "../redux/slices/orderDeliverySlice";
import { selectId, selectName, selectEmail, selectPhoneNum, setName, setEmail, setPhoneNum } from "../redux/slices/userSlice";
import { useClientSocket } from "./client_socket";
import { useDispatch } from "react-redux";

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
  const [nameNew, setNameNew] = useState(name);

  const [emailEdit, setEmailEdit] = useState(false);
  const [emailNew, setEmailNew] = useState(email)

  const [phoneEdit, setPhoneEdit] = useState(false);
  const [phoneNew, setPhoneNew] = useState(phone)

  const [addressEdit, setAddressEdit] = useState(false);
  const [addressNew, setAddressNew] = useState("")

  const [roomEdit, setRoomEdit] = useState(false);
  const [roomNew, setRoomNew] = useState("")


  const dispatch = useDispatch();

  console.log('deb', nameNew)

  return (
    <View style={styles.container}>
      <View style={styles.order_rev}>
        <Text>Name</Text>
        <TextInput
          style={styles.single_input}
          placeholder={`${name}`}
          onChangeText={(i) => {
            setNameNew(i);
          }}
          editable={nameEdit}
          placeholderTextColor={'black'} 
        ></TextInput>
        <Button title="Edit" onPress={() => setNameEdit(true)}></Button>
        <Text>Email</Text>

        <TextInput
          style={styles.single_input}
          placeholder={`${email}`}
          onChangeText={(i) => {
            setEmailNew(i);
          }}
          editable={emailEdit}
          placeholderTextColor={'black'} 

        ></TextInput>
        <Button title="Edit" onPress={() => setEmailEdit(true)}></Button>

        <Text>Phone Number</Text>
        <TextInput
          style={styles.single_input}
          placeholder={`${phone}`}
          onChangeText={(i) => {
            setPhoneNew(i);
          }}          
          editable={phoneEdit}
          placeholderTextColor={'black'} 

        ></TextInput>
        <Button title="Edit" onPress={() => setPhoneEdit(true)}></Button>

        <Text>Address</Text>
        <TextInput
          style={styles.single_input}
          placeholder={`${navigation.state.params ? navigation.state.params.drop_loc.name : drop_loc.name}`}
          onChangeText={() => {}}
          editable={false}
          placeholderTextColor={'black'} 

        ></TextInput>
        <Button
          title="Edit"
          onPress={() => {
            setAddressEdit(true)
            navigation.navigate("MapTest", { addressEdit: true });
          }}
        ></Button>

        <Text>Room Number</Text>
        <TextInput
          style={styles.single_input}
          placeholder={"undefined"}
          onChangeText={(i) => {
            setRoomNew(i);
          }}          
          editable={roomEdit}
          placeholderTextColor={'black'} 

        ></TextInput>
        <Button title="Edit" onPress={() => setRoomEdit(true)}></Button>
      </View>
      <Button
        title="Save"
        onPress={() => {
          dispatch(setName(nameNew))
          dispatch(setEmail(emailNew))
          dispatch(setPhoneNum(phoneNew))
          // dispatch(setRoom(roomNew)) NEED TO ADD after slice update
          if (addressEdit) {
            dispatch(
              setDropLocation(navigation.state.params.drop_loc))
          }
          navigation.navigate("OrderStatus");
        }}
      ></Button>
      <Button title="Cancel" onPress={() => navigation.navigate("OrderStatus")}></Button>
      <StatusBar style="auto" />
    </View>
  );
}
