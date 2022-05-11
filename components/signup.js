import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import ImageUpload from './image_upload';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmail, setId, setName, setPhoneNum } from '../redux/slices/userSlice';
import { DEATS_SERVER_URL, ROUTE_CREATE_ACC } from '../utils/Constants';

export function Signup ({ navigation }) {
    const dispatch = useDispatch()
    const [typedName, setTypedName] = useState("")
    const [typedNumber, setTypedNumber] = useState("")
    const [typedEmail, setTypedEmail] = useState("")
    const [typedPassword, setTypedPassword] = useState("")

    const sendAccInfo = () => {
        if (typedEmail == '' || typedPassword == '') {
            console.log("cannot submit empty email/password");
        } else {
            fetch(`${DEATS_SERVER_URL}${ROUTE_CREATE_ACC}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_info: {
                        email: typedEmail,
                        name: typedName,
                        phone_num: typedNumber,
                    },
                    password: typedPassword,
                    test: true,
                })
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.succeeded == true) {
                    dispatch(setId(data.user.user_id))
                    dispatch(setEmail(typedEmail))
                    dispatch(setName(typedName))
                    dispatch(setPhoneNum(typedNumber))
                    
                    navigation.navigate('Home');
                } else {
                    console.log(data.msg);
                }
            })
            .catch(err => console.error(err));
        }
    }

    return (
        <View style={styles.container}>
            <ImageUpload/>
            <Text style={styles.signup_text}>Please enter your information below!</Text>
            <View style={styles.signup_info}>
                <TextInput style={styles.signup_input} placeholder='name' onChangeText={text => setTypedName(text)}></TextInput>
                <TextInput style={styles.signup_input} placeholder='number' onChangeText={text => setTypedNumber(text)}></TextInput>
                <TextInput style={styles.signup_input} placeholder='email' onChangeText={text => setTypedEmail(text)}></TextInput>
                <TextInput style={styles.signup_input} placeholder='password' onChangeText={text => setTypedPassword(text)}></TextInput>
            </View>
            <View style={styles.singup_buttons}>
                <View style={styles.signup_create}>
                    <Button  color="#8a2be2" title="Create Account" onPress={sendAccInfo}></Button>
                </View>
                <View>
                    <Button color="#8a2be2" title='I have an account already' onPress={() => navigation.navigate('Landing')}></Button>
                </View>
            </View>
            
            <StatusBar style="auto" />
        </View>
    )
}
