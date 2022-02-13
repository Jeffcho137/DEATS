import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';

export class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profile_heading}>
                    <View>
                        <Text>FIRST LAST</Text>
                        <Text>my rating</Text>
                    </View>
                </View>
                <View style={styles.phone_number}>
                    <Text>Phone number: XXX-XXX-XXXX</Text>
                    <Button title='edit'></Button>
                </View>
                <View style={styles.payment}>
                    <Text>Preferred payment method: </Text>
                    <Button title='edit'></Button>
                </View>
                <View style={styles.past_orders}>
                    <Text>Your Past Orders</Text>
                </View>
                <View style={styles.past_deliveries}>
                    <Text>Your Past Deliveries</Text>
                </View>
                <StatusBar style="auto" />
            </View>
        )
    }
}