import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, Image, } from 'react-native';
import { useState } from "react";
import styles from '../style';
import  Logo  from './image.js';

export function Landing (props) {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(true)

  const fetchUsers = async () => {
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
        console.log(data);
        if (data.succeeded == true) {
            console.log("before");
            // setId(data.id)
            // setName(data.name)
            // setNumber(data.phone_num)
            props.navigation.navigate('Home', {
                id: data.id,
                name: data.name,
                number: data.phone_num,
                email: email, 
                password: password,
            });
        } else {
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
          {/* <Logo style={styles.logo_image}/> */}
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


// export class LandingC extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//           id: '',
//           name: '',
//           number: '',
//           email: '',
//           password: '',
//           success: true,
//           message: '',
//         }
//     }

//     componentDidMount() {
//       console.log("componentDidMount fired");
//       console.log("STATE", this.state);
//     }
    
//     componentDidUpdate() {
//       console.log("componentDidUpdate fired");
//       console.log("STATE", this.state);
//     }

//     fetchUsers = async () => {
//         try {
//           const response = await fetch(
//             'https://deats-backend-test.herokuapp.com/show_users/'
//           );
//           const json = await response.json();
//           console.log(json);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//     sendLogin = () => {
//       fetch('https://deats-backend-test.herokuapp.com/login/',
//       {
//           method: 'POST',
//           headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//               email: this.state.email,
//               password: this.state.password,
//           })
//       })
//       .then(response => response.json())
//       .then((data) => {
//           console.log(data);
//           if (data.succeeded == true) {
//               console.log("before",this.state);
//               this.setState({
//                   id: data.id,
//                   name: data.name,
//                   number: data.phone_num,
//               }, console.log("after",this.state));
//               this.props.navigation.navigate('Home', {
//                   id: this.state.id,
//                   name: this.state.name,
//                   number: this.state.number,
//                   email: this.state.email, 
//                   password: this.state.password,
//               });
//           } else {
//               console.log(data.msg);
//               this.setState({
//                   success: false,
//                   message: data.msg,
//               })
//           }
//       })
//       .catch(err => console.error('err'));
//     }

//     renderErrorMessage = () => {
//       if (this.state.success) {
//         return;
//       } else {
//         return(
//           <Text style={styles.unsuccessful_login}>{this.state.message}</Text>
//         )
//       }
//     }

//     render() {
//         return (
//             <View style={styles.container}>
        
//                 {/* <Logo style={styles.logo_image}/> */}
//                 <Logo/>
//                 <View style={styles.login_info}>
//                     <TextInput style={styles.login_input} placeholder='email' onChangeText={text => this.setState({email: text})}></TextInput>
//                     <TextInput style={styles.login_input} placeholder='password' onChangeText={text => this.setState({password: text})}></TextInput>
//                 </View>
//                 <View style={styles.landing_buttons}>
//                     <View style={styles.login_button}>
//                         <Button color="#006400" title='Sign-in' onPress={this.sendLogin}></Button>
//                     </View>
//                     {this.renderErrorMessage()}
//                     <View style={styles.create_acc_button}>
//                         <Button color="#006400" style={styles.create_acc_button} title='Sign-up' onPress={() => this.props.navigation.navigate('Signup')}></Button>
//                     </View>
//                 </View>
//                  <StatusBar style="auto" />
//             </View>
//         )
//     }
// }