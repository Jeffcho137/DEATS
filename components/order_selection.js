import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectId } from '../redux/slices/userSlice';
import { selectDestination, selectStartingPoint, setStartingPoint } from '../redux/slices/makeDeliverySlice';

export function Order_selection ({ navigation }) {
    const dispatch = useDispatch()
    const id = useSelector(selectId)
 
    const [room, setRoom] = useState("")
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    const selectTheHop = () => {
        dispatch(setStartingPoint({
            x: 43.7020,
            y: -72.2879,
            name: "The Hop"
        }))
    }

    const selectCollis = () => {
        dispatch(setStartingPoint({
            x: 43.7027,
            y: -72.2898,
            name: "Collis"
        }))
    }

    const sendOrdererInfo = () => {    
        const startingPoint = useSelector(selectStartingPoint)
        const destination = useSelector(selectDestination)
        
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
                    x: destination.lat,
                    y: destination.long
                },
                pickup_loc: {
                    x: startingPoint.lat,
                    y: startingPoint.long
                },
                pickup_loc_name: startingPoint.name,
                drop_loc_name: destination.name,
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.succeeded == true) {
                if (room == '' || foodPlace == '' ) {
                    console.log("fill everything out u fucker")
                } else {
                    navigation.navigate('OrderSearch')
                }
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.error(err));
    }

    const loc_chosen = navigation.state.params.chosen;
    console.log("ADDRESS", destination.name)
    if (!loc_chosen) {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>I want food from:</Text>
                    <View style={styles.order_sel_place_options}>
                        <View style={styles.order_sel_single_place}>
                            <Button color='#006400' title='HOP' onPress={selectTheHop}></Button>
                        </View>
                        <View style={styles.order_sel_single_place}>
                            <Button color='#006400' title='Collis' onPress={selectCollis}></Button>
                        </View>
                    </View>
                </View>
                <View style={styles.order_sel_input}>
                    <Text style={styles.order_sel_text}>Deliver to:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Button color="#006400" title='select my location' onPress={() => navigation.navigate("MapTest")}></Button>
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
                            <Button color="#006400" title='HOP' onPress={selectTheHop}></Button>
                        </View>
                        <View style={styles.order_sel_single_place}>
                            <Button color="#006400" title='Collis' onPress={selectCollis}></Button>
                        </View>
                    </View>
                </View>
                <View style={styles.order_sel_input}>
                    <Text style={styles.order_sel_text}>Deliver to:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Text style={styles.order_sel_loc}>{address}</Text>
                        <Button color="#006400" title='change my location' onPress={() => navigation.navigate("MapTest")}></Button>
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
