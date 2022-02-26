import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            success: false,
        }
    }

    // printID = () => {
    //     if (this.state.id != '') {
    //         console.log(this.state.id);
    //     } else {
    //         console.log("unsuccessful creation of account");
    //     }
    // }

    sendLogin = () => {
        // if (this.state.email == '' || this.state.password == '') {
        //     console.log("cannot submit empty email/password");
        // } else {
            fetch('https://deats-backend-test.herokuapp.com/login/',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                })
            })
            .then(response => response.text())
            .then((data) => {
                console.log(data);
                this.setState({
                    id: data,
                    success: true,
                });
            })
            .then((data) => {
                console.log('test')
                this.props.navigation.navigate('Home', {
                    id: this.state.id,
                    email: this.state.email, 
                    password: this.state.password,
                });
            })
            .catch(err => console.error('err'));
        // }
    }

    render() {
        // if (this.state.success == true) {
            return (
                <View style={styles.container}>
                    <TextInput placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
                    <TextInput placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
                    <Button title="send login info" onPress={this.sendLogin}></Button>
                    <Button title='i need to create an account' onPress={() => this.props.navigation.navigate('Signup')}></Button>
                    {/* <Button title="get id" onPress={this.printID}></Button> */}
                    <StatusBar style="auto" />
                </View>
            )
    }
}