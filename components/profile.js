import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import styles from '../style';

export class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.home_text}>this is the profile page</Text>
                <StatusBar style="auto" />
            </View>
        )
    }
}