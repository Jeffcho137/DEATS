import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Order_search extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.searching_text}>SEARCHING</Text>
                    
                </View>
                
                
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('OrderMatch')}></Button>
                <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>

            
                <StatusBar style="auto" />
            </View>
        )
    }
}