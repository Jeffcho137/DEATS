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
            food_place: 'HOP'
        })
    }

    collisChosen = () => {
        this.setState({
            food_place: 'Collis'
        })
    }

    sendDelivererInfo = () => {
        const  lat = this.props.navigation.state.params.lat;
        const long = this.props.navigation.state.params.long;
        // const loc_chosen = this.props.navigation.state.params.chosen;
        fetch('https://deats-backend-test.herokuapp.com/update_acc/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                res_location: this.state.food_place,
                fin_loc: {
                    x: lat,
                    y: long
                },
                // start_loc: {
                //     x: s_lat,
                //     y; 
                // }
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.succeeded == true) {
                if (this.state.room == '' || this.state.food_place == '' ) {
                    console.log("fill everything out u fucker")
                } else {
                    this.props.navigation.navigate('OrderSearch', {
                        id: this.state.id,
                        name: this.state.name,
                        number: this.state.number,
                        email: this.state.email,
                        password: this.state.password,
                        user_type: this.state.user_type,
                        food_place: this.state.food_place,
                        del_loc_lat: lat,
                        del_loc_long: long,
                        room: this.state.room,
                    })
                }
            } else {
                console.log(data.msg);
            }
        })
        // .then((data) => {
            
        // })
        .catch(err => console.error(err));
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>I want to pick up food from:</Text>
                    <View style={styles.order_sel_place_options}>
                        <View style={styles.order_sel_single_place}>
                            <Button color='black' title='HOP' onPress={this.hopChosen}></Button>
                        </View>
                        <View style={styles.order_sel_single_place}>
                            <Button color='black' title='Collis' onPress={this.collisChosen}></Button>
                        </View>
                    </View>
                </View>
                <View style={styles.deliver_sel_input}>
                    <Text style={styles.order_sel_text}>Leaving from:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Button title='select my location' onPress={() => this.props.navigation.navigate("MapTest")}></Button>
                    </View>
                </View>
                <View style={styles.deliver_sel_input}>
                    <Text style={styles.order_sel_text}>Going to:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Button title='select my location' onPress={() => this.props.navigation.navigate("MapTest")}></Button>
                    </View>
                </View>
                
                <Button title="Begin Searching" onPress={this.sendDelivererInfo}></Button>
            
                <StatusBar style="auto" />
            </View>
        )
    }
}