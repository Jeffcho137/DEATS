import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

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
            del_loc_lat: this.props.navigation.state.params.lat,
            del_loc_long: this.props.navigation.state.params.long,
            room: '',
            start_time: 0,
            end_time: 0,
            loc_chosen: this.props.navigation.state.params.chosen,
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
            food_place: 'COLLIS'
        })
    }

    sendOrdererInfo = (lat,long) => {
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
                fin_location: {
                    x: lat,
                    y: long
                }
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.succeeded == true) {
                this.setState({
                    id: data.user_id,
                    // del_loc_lat: lat,
                    // del_loc_long: long,
                });
            } else {
                console.log(data.msg);
            }
        })
        .then((data) => {
            this.props.navigation.navigate('OrderSearch')
        })
        .catch(err => console.error(err));
    }

    render() {
        const  del_loc_lat = this.props.navigation.state.params.lat;
        const del_loc_long = this.props.navigation.state.params.long;
        const loc_chosen = this.props.navigation.state.params.chosen;
        if (!loc_chosen) {
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
                            <Text>{del_loc_lat},{del_loc_long}</Text>
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
                    <Button title="Search" onPress={this.sendOrdererInfo(del_loc_lat,del_loc_long)}></Button>
                
                    <StatusBar style="auto" />
                </View>
            )
        }
        
    }
}