import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectOrderId, selectDelivererInfo, selectPickupLocation } from '../redux/slices/orderDeliverySlice';
import { useClientSocket } from './client_socket';
import { selectSelectedCustomer } from '../redux/slices/makeDeliverySlice';
import { selectId } from '../redux/slices/userSlice';


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
    // const order_status = useSelector(selectorder)
    joinRoomForOrder(orderId)
    const customer = useSelector(selectSelectedCustomer)
    console.log("here userID", user_id)
    console.log("here userID2", user_id)

    return (

        <View style={styles.container}>
            <View style={styles.order_sel}>
                {/* <Text style={styles.searching_text}>Delivery Confirmed!</Text>
                <Text style={styles.searching_text}>{delivererInfo.name} is on his way to {pickUpLocation.name}</Text>
                <Text style={styles.searching_text}>Your food is picked up</Text>
                <Text style={styles.searching_text}>Delivered</Text> */}
                {customer?.order_status}
                <Text style={styles.searching_text}>{customer?.order_status}</Text>
            </View>
            <Button title="GET" onPress={() => navigation.navigate("OrderCode")}></Button>
            <Button title="I got my food!" onPress={() => navigation.navigate('Completed')}></Button>
            <StatusBar style="auto" />
        </View>
    )
}
