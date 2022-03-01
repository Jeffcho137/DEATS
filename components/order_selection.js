import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
// import Map_test from "./map";

export class Order_selection extends Component {
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
            del_loc: this.props.navigation.state.params.lat,
            room: '',
            start_time: 0,
            end_time: 0,
            loc_chosen: this.props.navigation.state.params.chosen,
        }
    }

    hopChosen = () => {
        console.log(this.state.loc_chosen)
        this.setState({
            food_place: 'HOP'
        })
    }

    collisChosen = () => {
        this.setState({
            food_place: 'COLLIS'
        })
    }

    sendOrdererInfo = () => {
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
            } else {
                console.log(data.msg);
            }
        })
        .then((data) => {
            this.props.navigation.navigate('MapTest')
        })
        .catch(err => console.error(err));
    }

    render() {
        if (!this.state.loc_chosen) {
            return (
                <View style={styles.container}>
                    <View style={styles.order_sel}>
                        <Text style={styles.order_sel_text}>I want food from:</Text>
                        <View style={styles.order_sel_place_options}>
                            <View style={styles.order_sel_single_place}>
                                <Button color='black' title='HOP' onPress={this.hopChosen}></Button>
                            </View>
                            <View style={styles.order_sel_single_place}>
                                <Button color='black' title='Collis' onPress={this.collisChosen}></Button>
                            </View>
                        </View>
                    </View>
                    <View style={styles.order_sel_input}>
                        <Text style={styles.order_sel_text}>Deliver to:</Text>
                        <View style={styles.order_sel_input_box}>
                            <Button title='select my location' onPress={() => this.props.navigation.navigate("MapTest")}></Button>
                            {/* <TextInput style={styles.single_input} placeholder='del_loc name or street address' onChangeText={text => this.setState({del_loc: text})}></TextInput> */}
                            <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => this.setState({room: text})}></TextInput>
                            <TextInput style={styles.single_input} placeholder={this.state.number} onChangeText={text => this.setState({number: text})}></TextInput>
                        </View>
                    </View>
                    <View style={styles.order_sel}>
                        <Text style={styles.order_sel_text}>I want my food between</Text>
                        <View style={styles.order_sel_times}>
                            <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                            <Text style={styles.order_sel_times_text}>and</Text>
                            <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                        </View>
                    </View>
                    <Button title="Confirm" onPress={this.sendOrdererInfo}></Button>
                
                    <StatusBar style="auto" />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.order_sel}>
                        <Text style={styles.order_sel_text}>I want food from:</Text>
                        <View style={styles.order_sel_place_options}>
                            <View style={styles.order_sel_single_place}>
                                <Button color='black' title='HOP' onPress={this.hopChosen}></Button>
                            </View>
                            <View style={styles.order_sel_single_place}>
                                <Button color='black' title='Collis' onPress={this.collisChosen}></Button>
                            </View>
                        </View>
                    </View>
                    <View style={styles.order_sel_input}>
                        <Text style={styles.order_sel_text}>Deliver to:</Text>
                        <View style={styles.order_sel_input_box}>
                            {/* <Button title='select my location' onPress={() => this.props.navigation.navigate("MapTest")}></Button> */}
                            <Text>{this.state.del_loc}</Text>
                            <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => this.setState({room: text})}></TextInput>
                            <TextInput style={styles.single_input} placeholder={this.state.number} onChangeText={text => this.setState({number: text})}></TextInput>
                        </View>
                    </View>
                    <View style={styles.order_sel}>
                        <Text style={styles.order_sel_text}>I want my food between</Text>
                        <View style={styles.order_sel_times}>
                            <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                            <Text style={styles.order_sel_times_text}>and</Text>
                            <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                        </View>
                    </View>
                    <Button title="Confirm" onPress={this.sendOrdererInfo}></Button>
                
                    <StatusBar style="auto" />
                </View>
            )
        }
        
    }
}