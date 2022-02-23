import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { APIService } from '../api_components/APIService';

export class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    async componentDidMount() {
        var data = {
            "email": this.state.email,
            "password": this.state.password,
        }
        try {
            return fetch('SOME URL'), {
                'method':'POST',
                headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
            }
        } catch(e) {
            console.log(e)
        }
        return 0;
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
                <TextInput placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
                <Button title='LOGIN' onPress={() => this.props.navigation.navigate('Home')}></Button>
                <StatusBar style="auto" />
            </View>
        )
    }
}