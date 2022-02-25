import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { Order_selection } from './order_selection';

export class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: 'test email',
            password: 'test password',
            response: [ 'email', 'password'
            ],
        }
    }

    fetchUsers = () => {
        fetch('https://deats-backend-test.herokuapp.com/login/',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'deats@deats.com',
                    password: 'thebest',
                })
            })
            .then(response => response.text())
            .then((data) => {
                console.log(data);
            })
            .catch(err => console.error(err));
        // let data = this.state.email;
        // console.log(response.json())
        // this.setState({
        //     response: response,
        //     // email: response[0].email,
        //     // password: response[0].password,
        // })
        // return(
            // <View>
            //     {data.map((user) => (

            //     <Text>[{user}]</Text>

            // ))}</View>
        // )

        // this.setState({
        //     email: 'new email',
        //     password: 'new password'
        // });
    }

    render() {

        // async function fetchUsers() {
        //     let response = await fetch('https://deats-backend-test.herokuapp.com/show_users/');
        //     let data = await response.text();
        //     this.setState({
        //         ...this.state,
        //         email: data[0].email,
        //         password: data[0].password,
        //     })
        //     return this.state;
        //     // console.log(data);
        // }

        // let user = fetchUsers();

        // var state = {
        //     id:'',
        //     email:'',
        //     password:''
        // }

        return (


            <View style={styles.container}>
                <Button title="change state" onPress={this.fetchUsers}></Button>
                {/* <View>{this.state.response.map((user) => (
                    <Text>{user.email}</Text>
                ))}</View> */}
                <View>
                    {this.state.response.map((user) => (

                    <Text>{user}</Text>

                ))}</View>
                <View style={styles.home_profile_button}>
                    <Button title="Profile" onPress={() => this.props.navigation.navigate('Profile')}></Button>
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