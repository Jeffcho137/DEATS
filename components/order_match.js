import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectDelivererInfo } from '../redux/slices/orderDeliverySlice';

export function Order_match ({ navigation }) {
    const delivererInfo = useSelector(selectDelivererInfo)
      
    return (
        <View style={styles.container}>
            <View style={styles.order_sel}>
                <Text style={styles.searching_text}> {delivererInfo.name} is your deliverer</Text>
            </View>
            <Button title="Confirm" onPress={() => navigation.navigate('OrderStatus')}></Button>
            <StatusBar style="auto" />
        </View>
    )
}
