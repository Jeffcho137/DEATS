import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            number: '',
            email: '',
            password: '',
            success: false,
        }
    }

    printID = () => {
        if (this.state.id != '') {
            console.log(this.state.id);
        } else {
            console.log("unsuccessful creation of account");
        }
    }

    sendAccInfo = () => {
        if (this.state.email == '' || this.state.password == '') {
            console.log("cannot submit empty email/password");
        } else {
            fetch('https://deats-backend-test.herokuapp.com/create_acc/',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    name: this.state.email,
                    password: this.state.password,
                    phone_num: this.state.number,
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
                this.props.navigation.navigate('Home', {
                    id: this.state.id,
                    name: this.state.name,
                    number: this.state.number,
                    email: this.state.email, 
                    password: this.state.password,
                });
            })
            .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='name' onChangeText={text => this.setState({name: text})}></TextInput>
                <TextInput placeholder='number' onChangeText={text => this.setState({number: text})}></TextInput>
                <TextInput placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
                <TextInput placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
                <Button title="Create Account" onPress={this.sendAccInfo}></Button>
                <Button title='I have an account already' onPress={() => this.props.navigation.navigate('Login')}></Button>
                {/* <Button title="get id" onPress={this.printID}></Button> */}
                <StatusBar style="auto" />
            </View>
        )
    }
}