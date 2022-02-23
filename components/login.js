import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    render() {
        const [ text, setText ] = useState(state);
        // const [password, setPassword] = useState(null);
    
        return (
            <View style={styles.container}>
                <TextInput placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
                {/* <TextInput placeholder='password' onChangeText={text => this.setState({password: text})></TextInput> */}
                <StatusBar style="auto" />
            </View>
        )
    }
}