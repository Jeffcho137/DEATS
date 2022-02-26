import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { Order_selection } from './order_selection';

export class Home extends Component {

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

    fetchUsers = async () => {
        try {
          const response = await fetch(
            'https://deats-backend-test.herokuapp.com/show_users/'
          );
          const json = await response.text();
          console.log(json);
        } catch (error) {
          console.error(error);
        }
      };

    render() {
        return (
            <View style={styles.container}>
                <Button title="change state" onPress={this.fetchUsers}></Button>
                <View>
                    <Text>{this.state.email}</Text>
                </View>
                <View style={styles.home_profile_button}>
                    <Button title="Profile" onPress={() => this.props.navigation.navigate('Profile',{
                        id: this.state.id,
                        name: this.state.name,
                        number: this.state.number,
                        email: this.state.email, 
                        password: this.state.password,
                    })}></Button>
                </View>
                <View style={styles.home_options}>
                    <View style={styles.home_buttons}>
                        <Button title="Order Delivery" onPress={() => this.props.navigation.navigate('OrderSelection')}></Button>
                    </View>
                    <View style={styles.home_buttons}>
                        <Button title="Make Delivery"onPress={() => this.props.navigation.navigate('DeliverySelection')}></Button>
                    </View>
                </View>
                <StatusBar style="auto" />
            </View>
        )
    }
}