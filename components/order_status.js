
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectOrderId, selectDelivererInfo, selectPickupLocation,selectOrderStatus } from '../redux/slices/orderDeliverySlice';
import { selectId } from '../redux/slices/userSlice';
import { useClientSocket } from './client_socket';

export function Order_status ({ navigation }) {
    const orderId = useSelector(selectOrderId)
    const user_id = useSelector(selectId)

    const [joinRoomForOrder] = useClientSocket({
        userId: user_id,
        orderId: orderId,
        enabled: Boolean(user_id)
    })
    joinRoomForOrder(orderId)
    const status = useSelector(selectOrderStatus)

  return (
    <View style={styles.container}>
      <View style={styles.order_sel}>{status?<Text>{status}</Text>:<Text>Matched!</Text>}</View>
      <Button title="GET" onPress={() => navigation.navigate("OrderCode")}></Button>
      <Button title="I got my food!" onPress={() => navigation.navigate("Completed")}></Button>
      <StatusBar style="auto" />
    </View>
  );
}
