import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { APIService } from '../api_components/APIService';

export class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            email: 'email',
            password: 'password',
        }
    }

    // changeEmail = (event) => {
    //     this.setState({email: event.target.value});
    // }
    printID = () => {
        console.log(this.state.id);
    }

    sendLogin = () => {
        fetch('https://deats-backend-test.herokuapp.com/create_acc/',
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
                    id: data
                });
            })
            .catch(err => console.error(err));
    }

    render() {
        
        return (
            <View style={styles.container}>
                <Button title="send login info" onPress={this.sendLogin}></Button>
                <TextInput placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
                <TextInput placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
                {/* <Button title='SIGNUP' onPress={() => this.props.navigation.navigate('Home')}></Button> */}
                <Button title="get id" onPress={this.printID}></Button>
                <StatusBar style="auto" />
            </View>
        )
    }
}