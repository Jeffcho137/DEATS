import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput, Pressable, Modal } from "react-native";
import styles from "../style";
import { useSelector } from "react-redux";
import { selectOrderId, selectDropLocation } from "../redux/slices/orderDeliverySlice";
import { selectId, selectName, selectEmail, selectPhoneNum, setName, setEmail, setPhoneNum } from "../redux/slices/userSlice";
import { useClientSocket } from "./client_socket";
import { useDispatch } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';
import { COLOR_CROCODILE } from "../utils/Constants";

export function Order_review({ navigation, route }) {
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
      <View style={{alignItems: 'center', marginBottom: 40}}>
      < MaterialIcons name="check" size={150} style={{ 
                    color: COLOR_CROCODILE,
                    alignSelf: 'center',
                }}/>
      <Text style={{fontWeight: 'bold', marginBottom: 10,}}>Order Placed!</Text>
      <Text>Your order has been placed! To update your order please edit below.</Text>
      </View>
      
      <View style={{
      flex: 0.85,
      width: '90%',
    }}>
      <View style={{}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5,}}>Name</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              style={{fontSize: 15, borderRadius: 10, borderWidth: 1, width: '80%', height: '60%', textAlign: 'center'}}
              placeholder={`${name}`}
              onChangeText={(i) => {
                setNameNew(i);
              }}
              editable={nameEdit}
              placeholderTextColor={'black'} 
            ></TextInput>
            <Button title="Edit" onPress={() => setNameEdit(true)}></Button>
          </View>
      </View>

      <View style={{}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5,}}>Email</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
              style={{fontSize: 15, borderRadius: 10, borderWidth: 1, width: '80%', height: '60%', textAlign: 'center'}}
              placeholder={`${email}`}
              onChangeText={(i) => {
                setEmailNew(i);
              }}
              editable={emailEdit}
              placeholderTextColor={'black'} 

            ></TextInput>
            <Button title="Edit" onPress={() => setEmailEdit(true)}></Button>
        </View>
      </View>

      <View style={{}}>
      <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5,}}>Phone Number</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
              style={{fontSize: 15, borderRadius: 10, borderWidth: 1, width: '80%', height: '60%', textAlign: 'center'}}
              placeholder={`${phone}`}
              onChangeText={(i) => {
                setPhoneNew(i);
              }}          
              editable={phoneEdit}
              placeholderTextColor={'black'} 

          ></TextInput>
          <Button title="Edit" onPress={() => setPhoneEdit(true)}></Button>
        </View>
      </View>
      
      <View style={{}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5,}}>Address</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
              style={{fontSize: 15, borderRadius: 10, borderWidth: 1, width: '80%', height: '60%', textAlign: 'center'}}
              placeholder={`${route.params ? route.params.drop_loc.name : drop_loc.name}`}
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
        </View>
      </View>

      <View style={{}}>
      <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5,}}>Room Number</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
              style={{fontSize: 15, borderRadius: 10, borderWidth: 1, width: '80%', height: '60%', textAlign: 'center'}}
              placeholder={"undefined"}
            onChangeText={(i) => {
              setRoomNew(i);
            }}          
            editable={roomEdit}
            placeholderTextColor={'black'} 

          ></TextInput>
          <Button title="Edit" onPress={() => setRoomEdit(true)}></Button>
        </View>
      </View>
       
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
