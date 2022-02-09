import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { Order_selection } from './order_selection';

export class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.home_profile_button}>
                    <Button title="Profile" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                </View>
                <View style={styles.home_options}>
                    <View style={styles.home_buttons}>
                        <Button title="Order Delivery" onPress={() => this.props.navigation.navigate('OrderSelection')}></Button>
                    </View>
                    <View style={styles.home_buttons}>
                        <Button title="Make Delivery"onPress={() => this.props.navigation.navigate('DeliverySelection')}></Button>
                    </View>
                </View>
                <StatusBar style="auto" />
            </View>
        )
    }
}