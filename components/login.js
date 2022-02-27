import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            number: '',
            email: '',
            password: '',
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
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data.succeeded == true) {
                    this.setState({
                        id: data.id,
                        name: data.name,
                        number: data.phone_num,
                    });
                    this.props.navigation.navigate('Home', {
                        id: this.state.id,
                        name: this.state.name,
                        number: this.state.number,
                        email: this.state.email, 
                        password: this.state.password,
                    });
                } else {
                    console.log(data.msg);
                }
            })
            .catch(err => console.error('err'));
        // }
    }

    render() {
        // if (this.state.success == true) {
            return (
                <View style={styles.container}>
                    <Text style={styles.login_text}>Enter your email and password below:</Text>
                    <View style={styles.login_info}>
                        <TextInput style={styles.login_input} placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
                        <TextInput style={styles.login_input} placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
                    </View>
                    <View style={styles.login_buttons}>
                        <View style={styles.login}>
                            <Button title="Login" onPress={this.sendLogin}></Button>
                        </View>
                        <View>
                            <Button title='i need to create an account' onPress={() => this.props.navigation.navigate('Signup')}></Button>
                        </View>
                    </View>
                    <StatusBar style="auto" />
                </View>
            )
    }
}