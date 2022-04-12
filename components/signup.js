import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import ImageUpload from './image_upload';
import { useState } from 'react';

export function Signup (props) {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(true)

    const sendAccInfo = () => {
        if (email == '' || password == '') {
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
                    email: email,
                    name: name,
                    password: password,
                    phone_num: number,
                    test: true,
                })
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.succeeded == true) {
                    setId(data.user_id)
                    setSuccess(true)
                    props.navigation.navigate('Home', {
                        id: id,
                        name: name,
                        number: number,
                        email: email, 
                        password: password,
                    });
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
                <TextInput style={styles.signup_input} placeholder='name' onChangeText={text => setName(text)}></TextInput>
                <TextInput style={styles.signup_input} placeholder='number' onChangeText={text => setNumber(text)}></TextInput>
                <TextInput style={styles.signup_input} placeholder='email' onChangeText={text => setEmail(text)}></TextInput>
                <TextInput style={styles.signup_input} placeholder='password' onChangeText={text => setPassword(text)}></TextInput>
            </View>
            <View style={styles.singup_buttons}>
                <View style={styles.signup_create}>
                    <Button  color="#8a2be2" title="Create Account" onPress={sendAccInfo}></Button>
                </View>
                <View>
                    <Button color="#8a2be2" title='I have an account already' onPress={() => props.navigation.navigate('Landing')}></Button>
                </View>
            </View>
            
            <StatusBar style="auto" />
        </View>
    )
}


// export class SignupC extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             id: '',
//             name: '',
//             number: '',
//             email: '',
//             password: '',
//             success: false,
//         }
//     }

//     componentDidMount() {
//         console.log("componentDidMount fired");
//         console.log("STATE", this.state);
//     }
    
//     componentDidUpdate() {
//         console.log("componentDidUpdate fired");
//         console.log("STATE", this.state);
//     }

//     sendAccInfo = () => {
//         if (this.state.email == '' || this.state.password == '') {
//             console.log("cannot submit empty email/password");
//         } else {
//             fetch('https://deats-backend-test.herokuapp.com/create_acc/',
//             {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: this.state.email,
//                     name: this.state.name,
//                     password: this.state.password,
//                     phone_num: this.state.number,
//                     test: true,
//                 })
//             })
//             .then(response => response.json())
//             .then((data) => {
//                 console.log(data)
//                 if (data.succeeded == true) {
//                     this.setState({
//                         id: data.user_id,
//                         success: true,
//                     });
//                     this.props.navigation.navigate('Home', {
//                         id: this.state.id,
//                         name: this.state.name,
//                         number: this.state.number,
//                         email: this.state.email, 
//                         password: this.state.password,
//                     });
//                 } else {
//                     console.log(data.msg);
//                 }
//             })
//             .catch(err => console.error(err));
//         }
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <ImageUpload/>
//                 <Text style={styles.signup_text}>Please enter your information below!</Text>
//                 <View style={styles.signup_info}>
//                     <TextInput style={styles.signup_input} placeholder='name' onChangeText={text => this.setState({name: text})}></TextInput>
//                     <TextInput style={styles.signup_input} placeholder='number' onChangeText={text => this.setState({number: text})}></TextInput>
//                     <TextInput style={styles.signup_input} placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
//                     <TextInput style={styles.signup_input} placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
//                 </View>
//                 <View style={styles.singup_buttons}>
//                     <View style={styles.signup_create}>
//                         <Button  color="#8a2be2" title="Create Account" onPress={this.sendAccInfo}></Button>
//                     </View>
//                     <View>
//                         <Button color="#8a2be2" title='I have an account already' onPress={() => this.props.navigation.navigate('Landing')}></Button>
//                     </View>
//                 </View>
                
//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }