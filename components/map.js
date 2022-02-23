import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, Dimensions } from 'react-native';
import styles from '../style';
import MapView from 'react-native-maps';

export class Map_test extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text>SEARCHING</Text>
                    <MapView style={styles.map} />
                    
                </View>
                
                
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>

            
                <StatusBar style="auto" />
            </View>
        )
    }
}