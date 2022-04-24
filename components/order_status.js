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
            <View style={styles.status}>
                <Text style={styles.status_text}>Delivery Confirmed!</Text>
                <Text style={styles.status_text}>{delivererInfo.name} is on his way to {pickUpLocation.address}</Text>
                <Text style={styles.status_text}>Your food is picked up</Text>
                <Text style={styles.status_text}>Delivered</Text>
            </View>
            <Button title="I got my food!" onPress={() => navigation.navigate('Completed')}></Button>
            <StatusBar style="auto" />
        </View>
    )
}
