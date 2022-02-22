import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Completed extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.searching_text}>Thanks for using DEATS!</Text>
                    

                </View>
                
                
                <Button title="Back to home" onPress={() => this.props.navigation.navigate('Home')}></Button>

            
                <StatusBar style="auto" />
            </View>
        )
    }
}