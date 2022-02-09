import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { Order_selection } from './order_selection';

export class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.home_text}>this is the home page</Text>
                <Button title="Profile" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                <Button title="Order Delivery" onPress={() => this.props.navigation.navigate('Order_selection')}></Button>
                <Button title="Make Delivery"onPress={() => this.props.navigation.navigate('Delivery_selection')}></Button>
                <StatusBar style="auto" />
            </View>
        )
    }
}