import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Order_status extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.searching_text}>Delivery Confirmed</Text>
                    <Text style={styles.searching_text}>Alex is on his way to the HOP</Text>
                    <Text style={styles.searching_text}>Your food is picked up</Text>
                    <Text style={styles.searching_text}>Delivered</Text>

                </View>
                
                
                <Button title="I got my food!" onPress={() => this.props.navigation.navigate('MapTest')}></Button>

            
                <StatusBar style="auto" />
            </View>
        )
    }
}