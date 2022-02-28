import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Deliver_search extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text>SEARCHING</Text>
                    
                </View>
                
                
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>

            
                <StatusBar style="auto" />
            </View>
        )
    }
}