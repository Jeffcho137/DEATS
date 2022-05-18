import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectDelivererInfo, selectPickupLocation } from '../redux/slices/orderDeliverySlice';

export function Order_status ({ navigation }) {
    const delivererInfo = useSelector(selectDelivererInfo)
    const pickUpLocation = useSelector(selectPickupLocation)
  
    return (
        <View style={styles.container}>
            <View style={styles.order_sel}>
                <Text style={styles.searching_text}>Delivery Confirmed!</Text>
                <Text style={styles.searching_text}>{delivererInfo.name} is on his way to {pickUpLocation.name}</Text>
                <Text style={styles.searching_text}>Your food is picked up</Text>
                <Text style={styles.searching_text}>Delivered</Text>
            </View>
            <Button title="GET" onPress={() => navigation.navigate("OrderCode")}></Button>
            <Button title="I got my food!" onPress={() => navigation.navigate('Completed')}></Button>
            <Button title="Go to Payment" onPress={() => navigation.navigate("Payment")}></Button>
            <StatusBar style="auto" />
        </View>
    )
}
