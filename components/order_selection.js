import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectPhoneNum } from '../redux/slices/userSlice';
import { selectDropLocation, selectPickupLocation, setOrderId, setPickupLocation } from '../redux/slices/orderDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_ORDER_DEL } from '../utils/Constants';

export function Order_selection ({ navigation }) {
    const dispatch = useDispatch()
    const id = useSelector(selectId)
    const number = useSelector(selectPhoneNum)
    const dropLocation = useSelector(selectDropLocation)
    const pickupLocation = useSelector(selectPickupLocation)
 
    const [room, setRoom] = useState("")
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    const selectTheHop = () => {
        dispatch(setPickupLocation({
            lat: 43.7020,
            long: -72.2879,
            name: "The Hop"
        }))
    }

    const selectCollis = () => {
        dispatch(setPickupLocation({
            lat: 43.7027,
            long: -72.2898,
            name: "Collis"
        }))
    }

    const sendOrdererInfo = () => {  
        if (room == '' || !pickupLocation) {
            console.log("Please fill out all forms")
        } else {  
            fetch(`${DEATS_SERVER_URL}${ROUTE_ORDER_DEL}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    drop_loc: {
                        x: dropLocation.lat,
                        y: dropLocation.long
                    },
                    pickup_loc: {
                        x: pickupLocation.lat,
                        y: pickupLocation.long
                    },
                    pickup_loc_name: pickupLocation.name,
                    drop_loc_name: dropLocation.address,
                })
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.succeeded == true) {
                    dispatch(setOrderId(data.order_id))
                    navigation.navigate('OrderSearch') 
                } else {
                    console.log(data.msg);
                }
            })
            .catch(err => console.error(err));
        }
    }   

    const loc_chosen = navigation.state.params.chosen;
    console.log("Drop location", dropLocation)
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
                <Button color="#006400" title="GET" onPress={()=>navigation.navigate('OrderCode')}></Button>
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
                        <Text style={styles.order_sel_loc}>{dropLocation.address}</Text>
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
