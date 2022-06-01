
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectOrderId, selectDelivererInfo, selectPickupLocation,selectOrderStatus } from '../redux/slices/orderDeliverySlice';
import { selectId } from '../redux/slices/userSlice';
import { useClientSocket } from './client_socket';
import { COLOR_CROCODILE } from '../utils/Constants';

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
      <View style={{borderWidth: 1, borderRadius: 15, borderColor: COLOR_CROCODILE, width: '80%',
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: 20,
      padding: 20,
      backgroundColor: 'lightgrey'
      }}>
        <Text style={{fontSize: 20, color: COLOR_CROCODILE, fontWeight: 'bold', marginBottom: 10,}}>current status:</Text>
        <View style={{fontSize: 20}}>{status?<Text style={{fontSize: 20, }}>{status}</Text>:<Text>Matched!</Text>}</View>
      </View>
      <Text style={{
        width: '90%', 
        textAlign: 'center', 
        marginBottom: 50,
      }}>your order status will update as your deliverer completes your order</Text>
      
      <View>
        <View style={{}}>
          <Button title="GET Code" onPress={() => navigation.navigate("OrderCode")}></Button>
        </View>
        <View style={{}}>
          <Button title="Review My Order" onPress={() => navigation.navigate("OrderReview")}></Button>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: 50}}>
        <Button title="I got my food!" onPress={() => navigation.navigate("Completed")}></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
