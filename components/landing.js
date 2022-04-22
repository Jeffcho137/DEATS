import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, Image, } from 'react-native';
import { useState } from "react";
import styles from '../style';
import  Logo  from './image.js';
import { useDispatch } from 'react-redux';

export function Landing ({ navigation }) {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(true)


  const sendLogin = () => {
    fetch('https://deats-backend-test.herokuapp.com/login/',
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then(response => response.json())
    .then((data) => {
        console.log("login results:", data);
        if (data.succeeded == true) {
            dispatch(setId(data.id))
            dispatch(setEmail(data.email))
            dispatch(setName(data.name))
            dispatch(setNumber(data.phoneNum))

            navigation.navigate('Home')
        } 
          else {
            console.log(data.msg);
            setSuccess(false)
            setMessage(data.msg)
        }
    })
    .catch(err => console.error('err'));
  }

  const renderErrorMessage = () => {
    if (success) {
      return;
    } else {
      return(
        <Text style={styles.unsuccessful_login}>{message}</Text>
      )
    }
  }

  return (
      <View style={styles.container}>
          <Logo/>
          <View style={styles.login_info}>
              <TextInput style={styles.login_input} placeholder='email' onChangeText={text => setEmail(text)}></TextInput>
              <TextInput style={styles.login_input} placeholder='password' onChangeText={text => setPassword(text)}></TextInput>
          </View>
          <View style={styles.landing_buttons}>
              <View style={styles.login_button}>
                  <Button color="#006400" title='Sign-in' onPress={sendLogin}></Button>
              </View>
              {renderErrorMessage()}
              <View style={styles.create_acc_button}>
                  <Button color="#006400" style={styles.create_acc_button} title='Sign-up' onPress={() => props.navigation.navigate('Signup')}></Button>
              </View>
          </View>
          <StatusBar style="auto" />
      </View>
  )
}
