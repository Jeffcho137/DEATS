import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Deliver_match extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.searching_text}>Deliver to LSC from HOP</Text>
                    
                </View>
                
                
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('DeliverStatus')}></Button>

            
                <StatusBar style="auto" />
            </View>
        )
    }
}