import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, Pressable, Modal } from 'react-native';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectPhoneNum, setDEATSTokens } from '../redux/slices/userSlice';
import { selectDropLocation, selectPickupLocation, setOrderFee, setOrderId, setPickupLocation } from '../redux/slices/orderDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_ORDER_DEL, ROUTE_ORDER_FEE } from '../utils/Constants';
import { useClientSocket } from './client_socket';
import { DateTime } from './date_time';


export function Order_selection ({ navigation }) { 
    const [modalVisible, setModalVisible] = useState(false)
    const [tempOrderFee, setTempOrderFee] = useState(null)

    const dispatch = useDispatch()
    const user_id = useSelector(selectId)
    const number = useSelector(selectPhoneNum)
    const dropLocation = useSelector(selectDropLocation)
    const pickupLocation = useSelector(selectPickupLocation)
 
    const [room, setRoom] = useState("")
    const [date, setDate] = useState(new Date(Date.now()));

    const [joinRoomForOrder] = useClientSocket({
        userId: user_id,
        orderId: null,
        enabled: Boolean(user_id)
    })

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

    const checkOrderFee = () => {  
        fetch(`${DEATS_SERVER_URL}${ROUTE_ORDER_FEE}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                drop_loc: dropLocation,
                pickup_loc: pickupLocation

            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.succeeded == true) {
                setTempOrderFee(data.order_fee)
            } else {
                console.log(data.msg);
            }
         })
         .catch(err => console.error(err))
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
                    const order_id = data.order.order_id

                    joinRoomForOrder(order_id)

                    dispatch(setOrderId(order_id))
                    dispatch(setOrderFee(tempOrderFee))
                    dispatch(setDEATSTokens(data.user.DEATS_tokens))

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
                    <Text style={styles.order_sel_text}>Please select where you are ordering food from</Text>
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
                    <Text style={styles.order_sel_text}>Choose your delivery address below</Text>
                    <View style={styles.order_sel_input_box}>
                        <Button color="#006400" title='select my location' onPress={() => navigation.navigate("MapTest")}></Button>
                        <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => setRoom(text)}></TextInput>
                        <TextInput style={styles.single_input} placeholder='number' onChangeText={text => {}}></TextInput>
                    </View>
                </View>

                <View style={{
                    marginBottom: 30,
                }} >
                    <DateTime date={date} setDate={setDate}></DateTime>
                </View>

                {/* <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>I want my food between</Text>
                    <View style={styles.order_sel_times}>
                        <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                        <Text style={styles.order_sel_times_text}>and</Text>
                        <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                    </View>
                </View> */}

                <Button color="#006400" title="Confirm" onPress={sendOrdererInfo}></Button>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>Please select where you are ordering food from:</Text>
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
                    <Text style={styles.order_sel_text}>Please confirm that this is the correct address:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Text style={styles.order_sel_loc}>{dropLocation.address}</Text>
                        <Button color="#006400" title='change my location' onPress={() => navigation.navigate("MapTest")}></Button>
                        <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => setRoom(text)}></TextInput>
                        <TextInput style={styles.single_input} placeholder='number' onChangeText={text => {}}></TextInput>
                    </View>
                </View>

                <View style={{
                    marginBottom: 30,
                }} >
                    <DateTime date={date} setDate={setDate}></DateTime>
                </View>

                {/* <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>I want my food between</Text>
                    <View style={styles.order_sel_times}>
                        <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                        <Text style={styles.order_sel_times_text}>and</Text>
                        <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                    </View>
                </View> */}

                <Button title="Search" 
                    onPress={() => {
                        setModalVisible(true)
                        checkOrderFee()
                    }}>
                </Button>

                <Modal
                    animationType="slide" 
                    visible={modalVisible} 
                    transparent={true}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.bottomView}>
                        <View style={styles.modalViewPayment}>
                        <View style={styles.modalTextPayment}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                }}
                            >This order costs: {tempOrderFee?.toFixed(2)} DT</Text>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                sendOrdererInfo()
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.textModalPayment}>Pay Now</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {setModalVisible(false)}}
                        >
                            <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 22, fontSize: 18}}>Let me think about it</Text>
                        </Pressable>
                        </View>
                    </View>
                </Modal>

                <StatusBar style="auto" />
            </View>
        )
    } 
}
