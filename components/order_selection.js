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

    // numberEntered = () => {
    //     if (this.state.number == '') {
    //         return(
    //             <TextInput style={styles.single_input} placeholder='number' onChangeText={text => this.setState({number: text})}></TextInput>
    //         );
    //     } else {
    //         return(
    //             <View>
    //                 <Text>{this.state.number}</Text>
    //                 <Button title="change number"></Button>
    //             </View>
    //         );
    //     }
    // }


    sendOrdererInfo = () => {
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
                // fin_location: {
                //     x: lat,
                //     y: long
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
        const  del_loc_lat = this.props.navigation.state.params.lat;
        const del_loc_long = this.props.navigation.state.params.long;
        const loc_chosen = this.props.navigation.state.params.chosen;
        const address = this.props.navigation.state.params.address;
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
                            {/* {this.numberEntered()} */}
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
                            {/* <Text>{del_loc_lat},{del_loc_long}</Text> */}
                            <Text style={styles.order_sel_loc}>{address}</Text>
                            <Button title='change my location' onPress={() => this.props.navigation.navigate("MapTest")}></Button>
                            <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => this.setState({room: text})}></TextInput>
                            {/* {this.numberEntered()} */}
                            <TextInput style={styles.single_input} placeholder='number' onChangeText={text => this.setState({number: text})}></TextInput>
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
                    <Button title="Search" onPress={this.sendOrdererInfo.bind(this)}></Button>
                
                    <StatusBar style="auto" />
                </View>
            )
        }
        
    }
}