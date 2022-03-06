import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Delivery_selection extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.navigation.state.params.id,
            name: this.props.navigation.state.params.name,
            number: this.props.navigation.state.params.number,
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            user_type: this.props.navigation.state.params.user_type,
            food_place: '',
            start_loc: '',
            fin_loc: '',
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

    hopChosen = () => {
        this.setState({
            food_place: {
                x: 43.7020,
                y: -72.2879,
            }
        })
    }

    collisChosen = () => {
        this.setState({
            food_place: {
                x: 43.7027,
                y: -72.2898
            }
        })
    }

    sendDelivererInfo = () => {
        const start_lat = this.props.navigation.state.params.start_lat;
        const start_long = this.props.navigation.state.params.start_long;
        const fin_lat = this.props.navigation.state.params.fin_lat;
        const fin_long = this.props.navigation.state.params.fin_long;
        // const loc_chosen = this.props.navigation.state.params.chosen;
        fetch('https://deats-backend-test.herokuapp.com/make_del/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                final_des: {
                    x: fin_lat,
                    y: fin_long
                },
                num: 2
                // res_location: this.state.food_place,
                // start_loc: {
                //     x: start_lat,
                //     y: start_long,
                // }
            })
        })
        .then(response => response.json())
        .then((data) => {
            // console.log(data)
            // if (data.succeeded == true) {
                console.log("type: ",Object.keys(data.unmatched_users).length)
                console.log("these are my unmatched orders",data.unmatched_users)
                this.props.navigation.navigate('DeliverSearch', {
                    id: this.state.id,
                    name: this.state.name,
                    number: this.state.number,
                    email: this.state.email,
                    password: this.state.password,
                    user_type: this.state.user_type,
                    fin_lat: fin_lat,
                    fin_long: fin_long,
                    start_lat: start_lat,
                    start_long: start_long,
                    requests: data.unmatched_users,
                })
            // } else {
            //     console.log(data.msg);
            // }
        })
        .catch(err => console.error(err));
    }


    render() {
        const loc_chosen = this.props.navigation.state.params.chosen;
        const address1 = this.props.navigation.state.params.address1;
        const address2 = this.props.navigation.state.params.address2;
        if (!loc_chosen) {
            return (
                <View style={styles.container}>
                    <View style={styles.deliver_sel_input}>
                        {/* <Text style={styles.order_sel_text}>Leaving from:</Text> */}
                        <View style={styles.order_sel_input_box}>
                            <Button title='select my current location and final destination' onPress={() => this.props.navigation.navigate("DelMap")}></Button>
                        </View>
                    </View>
                    
                    <Button title="Begin Searching" onPress={this.sendDelivererInfo}></Button>
                
                    <StatusBar style="auto" />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.deliver_sel_input}>
                        <Text style={styles.order_sel_text}>Leaving from:</Text>
                        <View style={styles.order_sel_input_box}>
                            <Text>Leaving from: {address1}</Text>
                            <Text>Going to: {address2}</Text>
                            <Button title='change my starting location and final destination' onPress={() => this.props.navigation.navigate("DelMap")}></Button>
                        </View>
                    </View>
                    <Button title="Begin Searching" onPress={this.sendDelivererInfo}></Button>
                    <StatusBar style="auto" />
                </View>
            )
        }
        
    }
}