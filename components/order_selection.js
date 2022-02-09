import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';

export class Order_selection extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.home_text}>this is the order selection page</Text>
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
            
                <StatusBar style="auto" />
            </View>
        )
    }
}