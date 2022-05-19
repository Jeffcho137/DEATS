import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectOrderId, selectDelivererInfo, selectPickupLocation } from '../redux/slices/orderDeliverySlice';
import { selectId } from '../redux/slices/userSlice';
import { selectSelectedCustomer } from '../redux/slices/makeDeliverySlice';
import { useClientSocket } from './client_socket';

export function Order_status ({ navigation }) {
    const delivererInfo = useSelector(selectDelivererInfo)
    const pickUpLocation = useSelector(selectPickupLocation)
    const orderId = useSelector(selectOrderId)
    const user_id = useSelector(selectId)

    const [joinRoomForOrder] = useClientSocket({
        userId: user_id,
        orderId: orderId,
        enabled: Boolean(user_id)
    })
    console.log("idcheck", user_id, orderId)
    joinRoomForOrder(orderId)
    const customer = useSelector(selectSelectedCustomer)
    
    if (customer) {
        console.log('orderstatdebug', user_id, orderId, customer.customer)
    }
    return (
        <View style={styles.container}>
            <View style={styles.order_sel}>
                {/* <Text style={styles.searching_text}>Delivery Confirmed!</Text>
                <Text style={styles.searching_text}>{delivererInfo.name} is on his way to {pickUpLocation.name}</Text>
                <Text style={styles.searching_text}>Your food is picked up</Text>
                <Text style={styles.searching_text}>Delivered</Text>
             */}
                {customer?.order.order_status}

            </View>
            <Button title="GET" onPress={() => navigation.navigate("OrderCode")}></Button>
            <Button title="I got my food!" onPress={() => navigation.navigate('Completed')}></Button>
            <StatusBar style="auto" />
        </View>
    )
}
