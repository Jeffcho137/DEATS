import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';

export class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: this.props.navigation.state.params.id,
            name: this.props.navigation.state.params.name,
            number: this.props.navigation.state.params.number,
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            user_type: '',
        }
    }

    setUserTypeOrder = () => {
        this.setState({
            user_type: 'orderer',
        });
        this.sendUserType();
        this.props.navigation.navigate('OrderSelection',{
            id: this.state.id,
            name: this.state.name,
            number: this.state.number,
            email: this.state.email, 
            password: this.state.password,
            user_type: this.state.user_type,
        })
    }

    setUserTypeDeliverer = () => {
        this.setState({
            user_type: 'deliverer',
        });
        this.sendUserType();
        this.props.navigation.navigate('DeliverySelection',{
            id: this.state.id,
            name: this.state.name,
            number: this.state.number,
            email: this.state.email, 
            password: this.state.password,
            user_type: this.state.user_type,
        })
    }

    sendUserType = () => {
        fetch('https://deats-backend-test.herokuapp.com/create_acc/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                user_type: this.user_id,
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.succeeded == true) {
                this.setState({
                    id: data.user_id,
                    success: true,
                });
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.error(err));
    }


    render() {
        return (
            <View style={styles.container}>
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
                        <Button title="Order Delivery" onPress={this.setUserTypeOrder}></Button>
                    </View>
                    <View style={styles.home_buttons}>
                        <Button title="Make Delivery"onPress={this.setUserTypeDeliverer}></Button>
                    </View>
                </View>
                <StatusBar style="auto" />
            </View>
        )
    }
}