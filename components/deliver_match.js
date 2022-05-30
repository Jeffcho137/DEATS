import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectSelectedCustomer } from '../redux/slices/makeDeliverySlice';

export function Deliver_match (props) {
    const customer = useSelector(selectSelectedCustomer)
    
    return (
        <View style={styles.container}>
            <View style={styles.del_match}>
                <Text style={styles.searching_text_hardcode}>Deliver to:</Text>    
                <Text style={styles.searching_text}>{customer.order.drop_loc.name}</Text>  
            {/* </View> */}
            {/* <View style={styles.del_match}> */}
                <Text style={styles.searching_text_hardcode}>from:</Text>    
                <Text style={styles.searching_text}>{customer.order.pickup_loc.name}?</Text>
            </View>
            <View style={{position: 'absolute', bottom:50}}>
                <Button title="Confirm" onPress={() => props.navigation.navigate('DeliverStatus')}></Button>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}
