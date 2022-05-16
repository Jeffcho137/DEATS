import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectDelivererInfo, selectPickupLocation } from '../redux/slices/orderDeliverySlice';
import { selectSelectedCustomer } from '../redux/slices/makeDeliverySlice';

export function Order_status ({ navigation }) {
    const delivererInfo = useSelector(selectDelivererInfo)
    const pickUpLocation = useSelector(selectPickupLocation)
    const customer = useSelector(selectSelectedCustomer);

    return (
        <View style={styles.container}>
            <View style={styles.order_sel}>
                <Text style={styles.searching_text}> {customer.order_status} is the status </Text>
                <Text style={styles.searching_text}>{delivererInfo.name} is on his way to {pickUpLocation.name}</Text>
                <Text style={styles.searching_text}>Your food is picked up</Text>
                <Text style={styles.searching_text}>Delivered</Text>
            </View>
            <Button title="GET" onPress={() => navigation.navigate("OrderCode")}></Button>
            <Button title="I got my food!" onPress={() => navigation.navigate('Completed')}></Button>
            <StatusBar style="auto" />
        </View>
    )
}
