import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Button } from 'react-native';
import styles from '../style';
import  Logo  from './image_small.js';
import TabBarBottom from './tab_bar_bottom';

export function Home (props) {
    const setUserTypeOrder = () => {
        const type = "orderer";
        sendUserType(type);
        props.navigation.navigate('OrderSelection', {
            id: props.navigation.state.params.id,
            name: props.navigation.state.params.name,
            number: props.navigation.state.params.number,
            email: props.navigation.state.params.email, 
            password: props.navigation.state.params.password,
            user_type: type,
        })
    }

    const setUserTypeDeliverer = () => {
        const type = "deliverer";
        sendUserType(type);
        props.navigation.navigate('DeliverySelection', {
            id: props.navigation.state.params.id,
            name: props.navigation.state.params.name,
            number: props.navigation.state.params.number,
            email: props.navigation.state.params.email.trim(), 
            password: props.navigation.state.params.password,
            user_type: type,
        })
    }

    const sendUserType = (type) => {
        fetch('https://deats-backend-test.herokuapp.com/update_acc/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.navigation.state.params.id,
                user_type: type
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.succeeded == true) {

            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <View style={styles.container}>
            <View style={styles.home_profile_button}>
                <Button color="#006400" title="Profile" onPress={() => props.navigation.navigate('Profile',{
                    id: props.navigation.state.params.id,
                    name: props.navigation.state.params.name,
                    number: props.navigation.state.params.number,
                    email: props.navigation.state.params.email, 
                    password: props.navigation.state.params.password,
                })}></Button>
                 <Logo/>
            </View>
            <View style={styles.home_options}>
                <View style={styles.home_buttons}>
                    <Button color="#006400" title="Order Delivery" onPress={setUserTypeOrder}></Button>
                </View>
                <View style={styles.home_buttons}>
                    <Button color="#006400"title="Make Delivery"onPress={setUserTypeDeliverer}></Button>
                </View>
            </View>
            <StatusBar style="auto" />
            <TabBarBottom 
                navigation={props.navigation}
                id={props.navigation.state.params.id}
                name={props.navigation.state.params.name}
                number={props.navigation.state.params.number}
                email={props.navigation.state.params.email} 
                password={props.navigation.state.params.password}/>
        </View>
    )
}

// export class HomeC extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             id: this.props.navigation.state.params.id,
//             name: this.props.navigation.state.params.name,
//             number: this.props.navigation.state.params.number,
//             email: this.props.navigation.state.params.email,
//             password: this.props.navigation.state.params.password,
//             user_type: '',
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

//     setUserTypeOrder = () => {
//         const type = "orderer";
//         this.sendUserType(type);
//         this.props.navigation.navigate('OrderSelection',{
//             id: this.state.id,
//             name: this.state.name,
//             number: this.state.number,
//             email: this.state.email, 
//             password: this.state.password,
//             user_type: type,
//         })
//     }

//     setUserTypeDeliverer = () => {
//         const type = "deliverer";
//         this.sendUserType(type);
//         this.props.navigation.navigate('DeliverySelection',{
//             id: this.state.id,
//             name: this.state.name,
//             number: this.state.number,
//             email: this.state.email.trim(), 
//             password: this.state.password,
//             user_type: type,
//         })
//     }

//     sendUserType = (type) => {
//         fetch('https://deats-backend-test.herokuapp.com/update_acc/',
//         {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 id: this.state.id,
//                 user_type: type,
//             })
//         })
//         .then(response => response.json())
//         .then((data) => {
//             console.log(data)
//             if (data.succeeded == true) {
//                 this.setState({
//                     id: data.user_id,
//                 })
//             } else {
//                 console.log(data.msg);
//             }
//         })
//         .catch(err => console.error(err));
//     }


//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.home_profile_button}>
//                     <Button color="#006400" title="Profile" onPress={() => this.props.navigation.navigate('Profile',{
//                         id: this.state.id,
//                         name: this.state.name,
//                         number: this.state.number,
//                         email: this.state.email, 
//                         password: this.state.password,
//                     })}></Button>
//                                     <Logo/>

//                 </View>


                
//                 <View style={styles.home_options}>
//                     <View style={styles.home_buttons}>
//                         <Button color="#006400" title="Order Delivery" onPress={this.setUserTypeOrder}></Button>
//                     </View>
//                     <View style={styles.home_buttons}>
//                         <Button color="#006400"title="Make Delivery"onPress={this.setUserTypeDeliverer}></Button>
//                     </View>
//                 </View>
//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }