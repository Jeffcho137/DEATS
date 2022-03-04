import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import ImageUpload from './image_upload';

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

    componentDidMount() {
        console.log("componentDidMount fired");
        console.log("STATE", this.state);
    }
    
    componentDidUpdate() {
        console.log("componentDidUpdate fired");
        console.log("STATE", this.state);
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
                    name: this.state.name,
                    password: this.state.password,
                    phone_num: this.state.number,
                    test: true,
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
            .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageUpload/>
                <Text style={styles.signup_text}>Please enter your information below!</Text>
                <View style={styles.signup_info}>
                    <TextInput style={styles.signup_input} placeholder='name' onChangeText={text => this.setState({name: text})}></TextInput>
                    <TextInput style={styles.signup_input} placeholder='number' onChangeText={text => this.setState({number: text})}></TextInput>
                    <TextInput style={styles.signup_input} placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
                    <TextInput style={styles.signup_input} placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
                </View>
                <View style={styles.singup_buttons}>
                    <View style={styles.signup_create}>
                        <Button  color="#8a2be2" title="Create Account" onPress={this.sendAccInfo}></Button>
                    </View>
                    <View>
                        <Button  color="#8a2be2" title='I have an account already' onPress={() => this.props.navigation.navigate('Login')}></Button>
                    </View>
                </View>
                
                <StatusBar style="auto" />
            </View>
        )
    }
}