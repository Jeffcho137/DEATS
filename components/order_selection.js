import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export function Order_selection (props) {
    const id = props.navigation.state.params.id
    const name = props.navigation.state.params.name
    const number = props.navigation.state.params.number
    const email = props.navigation.state.params.email
    const password = props.navigation.state.params.password
    const user_type = props.navigation.state.params.user_type

    const [foodPlace, setFoodPlace] = useState(null)
    const [foodPlaceName, setFoodPlaceName] = useState("")
    const [room, setRoom] = useState("")
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    const hopChosen = () => {
        setFoodPlace ({
            x: 43.7020,
            y: -72.2879,
        })

        setFoodPlaceName("HOP")
    }

    const collisChosen = () => {
        setFoodPlace({
            x: 43.7027,
            y: -72.2898
        })

        setFoodPlaceName("Collis")
    }


    const sendOrdererInfo = () => {
        const lat = props.navigation.state.params.lat;
        const long = props.navigation.state.params.long;
        const address = props.navigation.state.params.address;
    
        fetch('https://deats-backend-test.herokuapp.com/order_del/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                drop_loc: {
                    x: lat,
                    y: long
                },
                pickup_loc: foodPlace,
                pickup_loc_name: foodPlaceName,
                drop_loc_name: address,
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.succeeded == true) {
                if (room == '' || foodPlace == '' ) {
                    console.log("fill everything out u fucker")
                } else {
                    props.navigation.navigate('OrderSearch', {
                        id: id,
                        name: name,
                        number: number,
                        email: email,
                        password: password,
                        user_type: user_type,
                        food_place: foodPlace,
                        del_loc_lat: lat,
                        del_loc_long: long,
                        room: room,
                        order_id: data.order_id,
                        food_place_name: foodPlaceName
                    })
                }
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.error(err));
    }

    const loc_chosen = props.navigation.state.params.chosen;
    const address = props.navigation.state.params.address;
    console.log("ADDRESS", address)
    if (!loc_chosen) {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>I want food from:</Text>
                    <View style={styles.order_sel_place_options}>
                        <View style={styles.order_sel_single_place}>
                            <Button color='#006400' title='HOP' onPress={hopChosen}></Button>
                        </View>
                        <View style={styles.order_sel_single_place}>
                            <Button color='#006400' title='Collis' onPress={collisChosen}></Button>
                        </View>
                    </View>
                </View>
                <View style={styles.order_sel_input}>
                    <Text style={styles.order_sel_text}>Deliver to:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Button color="#006400" title='select my location' onPress={() => props.navigation.navigate("MapTest")}></Button>
                        <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => setRoom(text)}></TextInput>
                        <TextInput style={styles.single_input} placeholder={number} onChangeText={text => {}}></TextInput>
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
                <Button color="#006400" title="Confirm" onPress={sendOrdererInfo}></Button>
            
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
                            <Button color="#006400" title='HOP' onPress={hopChosen}></Button>
                        </View>
                        <View style={styles.order_sel_single_place}>
                            <Button color="#006400" title='Collis' onPress={collisChosen}></Button>
                        </View>
                    </View>
                </View>
                <View style={styles.order_sel_input}>
                    <Text style={styles.order_sel_text}>Deliver to:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Text style={styles.order_sel_loc}>{address}</Text>
                        <Button color="#006400" title='change my location' onPress={() => props.navigation.navigate("MapTest")}></Button>
                        <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => setRoom(text)}></TextInput>
                        <TextInput style={styles.single_input} placeholder='number' onChangeText={text => {}}></TextInput>
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
                <Button title="Search" onPress={sendOrdererInfo}></Button>
                <StatusBar style="auto" />
            </View>
        )
    } 
}


// export class Order_selectionC extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             id: this.props.navigation.state.params.id,
//             name: this.props.navigation.state.params.name,
//             number: this.props.navigation.state.params.number,
//             email: this.props.navigation.state.params.email,
//             password: this.props.navigation.state.params.password,
//             user_type: this.props.navigation.state.params.user_type,
//             food_place: '',
//             food_place_name: '',
//             del_loc_lat: this.props.navigation.state.params.lat,
//             del_loc_long: this.props.navigation.state.params.long,
//             room: '',
//             start_time: 0,
//             end_time: 0,
//             loc_chosen: this.props.navigation.state.params.chosen,
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

//     hopChosen = () => {
//         this.setState({
//             food_place: {
//                 x: 43.7020,
//                 y: -72.2879,
//             },
//             food_place_name: "HOP",
//         })
//     }

//     collisChosen = () => {
//         this.setState({
//             food_place: {
//                 x: 43.7027,
//                 y: -72.2898
//             }, 
//             food_place_name: "Collis"
//         })
//     }


//     sendOrdererInfo = () => {
//         const lat = this.props.navigation.state.params.lat;
//         const long = this.props.navigation.state.params.long;
//         const address = this.props.navigation.state.params.address;
//         // const loc_chosen = this.props.navigation.state.params.chosen;
//         fetch('https://deats-backend-test.herokuapp.com/order_del/',
//         {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 id: this.state.id,
//                 drop_loc: {
//                     x: lat,
//                     y: long
//                 },
//                 pickup_loc: this.state.food_place,
//                 pickup_loc_name: this.state.food_place_name,
//                 drop_loc_name: address,
//                 // number: this.state.number,
//             })
//         })
//         .then(response => response.json())
//         .then((data) => {
//             console.log(data)
//             if (data.succeeded == true) {
//                 if (this.state.room == '' || this.state.food_place == '' ) {
//                     console.log("fill everything out u fucker")
//                 } else {
//                     this.props.navigation.navigate('OrderSearch', {
//                         id: this.state.id,
//                         name: this.state.name,
//                         number: this.state.number,
//                         email: this.state.email,
//                         password: this.state.password,
//                         user_type: this.state.user_type,
//                         food_place: this.state.food_place,
//                         del_loc_lat: lat,
//                         del_loc_long: long,
//                         room: this.state.room,
//                         order_id: data.order_id,
//                         food_place_name: this.state.food_place_name
//                     })
//                 }
//             } else {
//                 console.log(data.msg);
//             }
//         })
//         // .then((data) => {
            
//         // })
//         .catch(err => console.error(err));
//     }

//     render() {
//         const loc_chosen = this.props.navigation.state.params.chosen;
//         const address = this.props.navigation.state.params.address;
//         if (!loc_chosen) {
//             return (
//                 <View style={styles.container}>
//                     <View style={styles.order_sel}>
//                         <Text style={styles.order_sel_text}>I want food from:</Text>
//                         <View style={styles.order_sel_place_options}>
//                             <View style={styles.order_sel_single_place}>
//                                 <Button color='#006400' title='HOP' onPress={this.hopChosen}></Button>
//                             </View>
//                             <View style={styles.order_sel_single_place}>
//                                 <Button color='#006400' title='Collis' onPress={this.collisChosen}></Button>
//                             </View>
//                         </View>
//                     </View>
//                     <View style={styles.order_sel_input}>
//                         <Text style={styles.order_sel_text}>Deliver to:</Text>
//                         <View style={styles.order_sel_input_box}>
//                             <Button color="#006400" title='select my location' onPress={() => this.props.navigation.navigate("MapTest")}></Button>
//                             {/* <TextInput style={styles.single_input} placeholder='del_loc name or street address' onChangeText={text => this.setState({del_loc: text})}></TextInput> */}
//                             <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => this.setState({room: text})}></TextInput>
//                             {/* {this.numberEntered()} */}
//                             <TextInput style={styles.single_input} placeholder={this.state.number} onChangeText={text => this.setState({number: text})}></TextInput>
//                         </View>
//                     </View>
//                     <View style={styles.order_sel}>
//                         <Text style={styles.order_sel_text}>I want my food between</Text>
//                         <View style={styles.order_sel_times}>
//                             <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
//                             <Text style={styles.order_sel_times_text}>and</Text>
//                             <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
//                         </View>
//                     </View>
//                     <Button color="#006400" title="Confirm" onPress={this.sendOrdererInfo}></Button>
                
//                     <StatusBar style="auto" />
//                 </View>
//             )
//         } else {
//             return (
//                 <View style={styles.container}>
//                     <View style={styles.order_sel}>
//                         <Text style={styles.order_sel_text}>I want food from:</Text>
//                         <View style={styles.order_sel_place_options}>
//                             <View style={styles.order_sel_single_place}>
//                                 <Button color="#006400" title='HOP' onPress={this.hopChosen}></Button>
//                             </View>
//                             <View style={styles.order_sel_single_place}>
//                                 <Button color="#006400" title='Collis' onPress={this.collisChosen}></Button>
//                             </View>
//                         </View>
//                     </View>
//                     <View style={styles.order_sel_input}>
//                         <Text style={styles.order_sel_text}>Deliver to:</Text>
//                         <View style={styles.order_sel_input_box}>
//                             {/* <Button title='select my location' onPress={() => this.props.navigation.navigate("MapTest")}></Button> */}
//                             {/* <Text>{del_loc_lat},{del_loc_long}</Text> */}
//                             <Text style={styles.order_sel_loc}>{address}</Text>
//                             <Button color="#006400" title='change my location' onPress={() => this.props.navigation.navigate("MapTest")}></Button>
//                             <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => this.setState({room: text})}></TextInput>
//                             {/* {this.numberEntered()} */}
//                             <TextInput style={styles.single_input} placeholder='number' onChangeText={text => this.setState({number: text})}></TextInput>
//                         </View>
//                     </View>
//                     <View style={styles.order_sel}>
//                         <Text style={styles.order_sel_text}>I want my food between</Text>
//                         <View style={styles.order_sel_times}>
//                             <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
//                             <Text style={styles.order_sel_times_text}>and</Text>
//                             <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
//                         </View>
//                     </View>
//                     <Button title="Search" onPress={this.sendOrdererInfo.bind(this)}></Button>
                
//                     <StatusBar style="auto" />
//                 </View>
//             )
//         }
        
//     }
// }