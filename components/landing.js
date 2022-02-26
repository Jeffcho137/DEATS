import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';

export class Landing extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    fetchUsers = async () => {
        try {
          const response = await fetch(
            'https://deats-backend-test.herokuapp.com/show_users/'
          );
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.error(error);
        }
      };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.landing_logo}>D-EATS</Text>
                <View style={styles.landing_buttons}>
                    <View style={styles.create_acc_button}>
                        <Button style={styles.create_acc_button} title='Create an Account!' onPress={() => this.props.navigation.navigate('Signup')}></Button>
                    </View>
                    <View style={styles.login_button}>
                        <Button title='Login with existing account!' onPress={() => this.props.navigation.navigate('Login')}></Button>
                    </View>
                </View>
                 <StatusBar style="auto" />
            </View>
        )
    }
}