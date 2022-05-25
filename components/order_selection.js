import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, Pressable, Modal } from 'react-native';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectPhoneNum, setDEATSTokens } from '../redux/slices/userSlice';
import { selectDropLocation, selectPickupLocation, setOrderFee, setOrderId, setPickupLocation } from '../redux/slices/orderDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_ORDER_DEL, ROUTE_ORDER_FEE } from '../utils/Constants';
import { DateTime } from './date_time';
import FoodLocs from './pickup_loc';


export function Order_selection ({ navigation }) { 
    const [modalVisible, setModalVisible] = useState(false)
    const [tempOrderFee, setTempOrderFee] = useState(null)
    const [selectedFoodLoc, setSelectedFoodLoc] = useState("The Hop")

    const dispatch = useDispatch()
    const number = useSelector(selectPhoneNum)
    const dropLocation = useSelector(selectDropLocation)
    const pickupLocation = useSelector(selectPickupLocation)
 
    const [room, setRoom] = useState("")
    const [date, setDate] = useState(new Date(Date.now()));

    useEffect(() => {
        if (selectedFoodLoc === "The Hop") {
            selectTheHop()
        } else {
            selectCollis()
        }
    }, [selectedFoodLoc])

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

    const loc_chosen = navigation.state.params.chosen;
    console.log("Drop location", dropLocation)
    
    
    return (
        <View style={styles.container}>
            <View style={styles.order_sel}>
                <Text style={styles.order_sel_text}>Select your order pickup location </Text>
                <View style={styles.order_sel_place_options}>
                    <FoodLocs selectedFoodLoc={selectedFoodLoc} setSelectedFoodLoc={setSelectedFoodLoc}/>
                </View>
            </View>
            <View style={styles.order_sel_input}>
                <Text style={styles.order_sel_text}>Choose your delivery address below</Text>
                <Button color="#006400" title='select my location' onPress={() => navigation.navigate("MapTest")}/>
                <View style={styles.order_sel_input}>
                    <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => setRoom(text)}></TextInput>
                    <TextInput style={styles.single_input} placeholder='number' onChangeText={text => {}}></TextInput>
                </View>
            </View>

            <View style={{
                marginBottom: 30,
            }} >
                <DateTime date={date} setDate={setDate}></DateTime>
            </View>

            <Button title="Confirm" 
                disabled={!(dropLocation && selectedFoodLoc && room)}
                onPress={() => {
                    setModalVisible(true)
                    checkOrderFee()
                }}/>

            <StatusBar style="auto" />

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
                                navigation.navigate('Checkout')
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.textModalPayment}>CHECKOUT</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {setModalVisible(false)}}
                        >
                            <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 22, fontSize: 18}}>Let me think about it</Text>
                        </Pressable>
                        </View>
                    </View>
                </Modal>
        </View>
    )
}
