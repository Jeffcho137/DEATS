import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { DEATS_SERVER_URL, ROUTE_LOGIN } from '../utils/Constants';

export class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            number: '',
            email: '',
            password: '',
            success: true,
            message: '',
        }
    }

    componentDidMount() {
        console.log("componentDidMount fired");
        console.log("STATE", this.state);
    }

    componentDidUpdate() {
        console.log("componentDidUpdate fired");
        console.log("STATE", this.state);
    }

    sendLogin = () => {
        fetch(`${DEATS_SERVER_URL}${ROUTE_LOGIN}`,
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
                console.log("before",this.state);
                this.setState({
                    id: data.id,
                    name: data.name,
                    number: data.phone_num,
                }, console.log("after",this.state));
                this.props.navigation.navigate('Home', {
                    id: this.state.id,
                    name: this.state.name,
                    number: this.state.number,
                    email: this.state.email, 
                    password: this.state.password,
                });
            } else {
                console.log(data.msg);
                this.setState({
                    success: false,
                    message: data.msg,
                })
            }
        })
        .catch(err => console.error('err'));
    }

    render() {
        if (this.state.success) {
            return (
                <View style={styles.container}>
                    <Text style={styles.login_text}>Enter your email and password below:</Text>
                    <View style={styles.login_info}>
                        <TextInput style={styles.login_input} placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
                        <TextInput style={styles.login_input} placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
                    </View>
                    <View style={styles.login_buttons}>
                        <View style={styles.login}>
                            <Button color="#8a2be2" title="Login" onPress={this.sendLogin}></Button>
                        </View>
                        <View>
                            <Button color="#8a2be2"title='I dont have an account yet' onPress={() => this.props.navigation.navigate('Signup')}></Button>
                        </View>
                    </View>
                    <StatusBar style="auto" />
                </View>
            )
        } else {
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
                        <Text style={styles.unsuccessful_login}>{this.state.message}</Text>
                        <View>
                            <Button title='I dont have an account yet' onPress={() => this.props.navigation.navigate('Signup')}></Button>
                        </View>
                    </View>
                    <StatusBar style="auto" />
                </View>
            )
        }
        
    }
}