import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectPhoneNum } from '../redux/slices/userSlice';
import { selectDropLocation, selectPickupLocation, setOrderId, setPickupLocation } from '../redux/slices/orderDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_ORDER_DEL } from '../utils/Constants';
import { io } from 'socket.io-client';

export function Order_selection ({ navigation }) {
    const [socket, setSocket] = useState(null)
    useEffect(() =>  { 
        const socket = io(DEATS_SERVER_URL, { })

        socket.on("connect", () => {
            console.log("socket id:", socket.id)

            const engine = socket.io.engine;
            console.log("transport before upgrade:", engine.transport.name)

            engine.once("upgrade", () => {
               console.log("transport after upgrade:", engine.transport.name)
            })
        })

        setSocket(socket)
    }, [])
 
    console.log("socket: ", socket)
    console.log("socket is connected:", socket?.connected)
    
    const dispatch = useDispatch()
    const user_id = useSelector(selectId)
    const number = useSelector(selectPhoneNum)
    const dropLocation = useSelector(selectDropLocation)
    const pickupLocation = useSelector(selectPickupLocation)
 
    const [room, setRoom] = useState("")
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    const selectTheHop = () => {
        dispatch(setPickupLocation({
            coordinates: {
                lat: 43.7020,
                long: -72.2879,
            },
            name: "The Hop"
        }))
    }

    const selectCollis = () => {
        dispatch(setPickupLocation({
            coordinates: {
                lat: 43.7027,
                long: -72.2898,
            },
            name: "Collis"
        }))
    }

    const sendOrdererInfo = () => {  
        if (room == '' || !pickupLocation) {
            console.log("fill everything out u fucker")
        } else {  
            fetch(`${DEATS_SERVER_URL}${ROUTE_ORDER_DEL}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    order: {
                        drop_loc: dropLocation,
                        pickup_loc: pickupLocation
                    }
                })
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.succeeded == true) {
                    order_id = data.order.order_id

                    // create a new room for the customer using the order_id
                    socket.emit("join", 
                    {
                        order_id: order_id, 
                        user_id: user_id
                    }, 
                    (response) => {
                        console.log("server join room response", response); 
                    });

                    dispatch(setOrderId(order_id))

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
