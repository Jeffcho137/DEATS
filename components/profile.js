import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';

export class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.navigation.state.params.id,
            name: this.props.navigation.state.params.name,
            number: this.props.navigation.state.params.number,
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profile_heading}>
                    <View>
                        <Text style={styles.profile_name}>{this.state.name}</Text>
                        <Text>my rating</Text>
                    </View>
                </View>
                <View style={styles.phone_number}>
                    <Text style={styles.profile_text}>Phone number: {this.state.number}</Text>
                    <Button title='edit'></Button>
                </View>
                <View style={styles.payment}>
                    <Text style={styles.profile_text}>Preferred payment method: </Text>
                    <Button title='edit'></Button>
                </View>
                <View style={styles.past_orders}>
                    <Text style={styles.profile_text}>Your Past Orders</Text>
                </View>
                <View style={styles.past_deliveries}>
                    <Text style={styles.profile_text}>Your Past Deliveries</Text>
                </View>
                <StatusBar style="auto" />
            </View>
        )
    }
}