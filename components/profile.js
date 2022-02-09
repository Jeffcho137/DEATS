import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';

export class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <Text>FIRST LAST</Text>
                        <Text>my rating</Text>
                    </View>
                </View>
                <View>
                    <Text>Phone number: XXX-XXX-XXXX</Text>
                    <Button title='edit'></Button>
                </View>
                <View>
                    <Text>Preferred payment method: </Text>
                    <Button title='edit'></Button>
                </View>
                <StatusBar style="auto" />
            </View>
        )
    }
}