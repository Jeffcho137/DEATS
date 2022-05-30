
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Text, View, Button, TextInput, Pressable, Modal } from 'react-native';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectPhoneNum } from '../redux/slices/userSlice';
import { selectDropLocation, selectOldDropLocation, selectOldPickupLocation, selectOrderFee, selectOrderId, selectPickupLocation, setPickupLocation } from '../redux/slices/orderDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_NEW_ORDER_FEE, ROUTE_ORDER_FEE, ROUTE_UPDATE_ORDER } from '../utils/Constants';
import { DateTime } from './date_time';
import FoodLocs from './pickup_loc';
import { selectNavigationMode } from '../redux/slices/navigationSlice';

const orderUpdateAlert = (title, msg, proceedAction, navigation) => {
    Alert.alert(
        title,
        msg,
        [
          { 
            text: "Proceed",
            onPress: () => {
                proceedAction();
            }
          }, 
          { 
            text: "Keep updating",
          },
          { 
            text: "Cancel all changes",
            onPress: () => {
              navigation.goBack()
            }
          }
        ],
        { cancelable: true }
    )
}

export function Order_selection ({ navigation }) { 
    const dispatch = useDispatch()
    const number = useSelector(selectPhoneNum)
    const userId = useSelector(selectId)
    const orderId = useSelector(selectOrderId)
    const dropLocation = useSelector(selectDropLocation)
    const pickupLocation = useSelector(selectPickupLocation)
    const OldDropLocation = useSelector(selectOldDropLocation)
    const OldPickupLocation = useSelector(selectOldPickupLocation)
    const orderFee = useSelector(selectOrderFee)
    const navigationMode = useSelector(selectNavigationMode)

    const [modalVisible, setModalVisible] = useState(false)
    const [tempOrderFee, setTempOrderFee] = useState(null)
    const [selectedFoodLoc, setSelectedFoodLoc] = useState(navigationMode === "updateOrder" ? pickupLocation.name : "The Hop")
 
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
    
    const checkNewOrderFee = () => {  
        fetch(`${DEATS_SERVER_URL}${ROUTE_NEW_ORDER_FEE}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_drop_loc: dropLocation,
                new_pickup_loc: pickupLocation,
                old_drop_loc: OldDropLocation,
                old_pickup_loc: OldPickupLocation,
                old_order_fee: orderFee
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log("updated order fee response:", data)
            if (data.succeeded == true) {
                const feeDiff = data.new_order_fee - orderFee
                if (feeDiff > 0) {
                    const title = "FEE WARNING"
                    const msg = `Are you sure you want to proceed with this order update? \n It costs ${feeDiff.toFixed(2)} DT extra due to the location change you made.`
                    const proceedAction = () => {
                        navigation.navigate("Checkout")
                    }
                    orderUpdateAlert(title, msg, proceedAction, navigation)
                    
                } else if (feeDiff < 0) {
                    const title = "TOKENS REFUND"
                    const msg = `The updated order costs ${Math.abs(feeDiff).toFixed(2)} less due to the location change you made \n We'll refund your money if you proceed.`
                    const proceedAction = () => {
                        updateOrder()
                    }
                    orderUpdateAlert(title, msg, proceedAction, navigation)

                } else {
                    const title = "CONFIRMATION"
                    const msg = "There are no charges involved with this order update."
                    const proceedAction = () => {
                        updateOrder()
                        navigation.goBack()
                    }
                    orderUpdateAlert(title, msg, proceedAction, navigation)
                }

                setTempOrderFee(data.new_order_fee)
            } else {
                console.log(data.msg);
            }
         })
         .catch(err => console.error(err))
    }

    const updateOrder = () => {  
        fetch(`${DEATS_SERVER_URL}${ROUTE_UPDATE_ORDER}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                order: {
                    order_id: orderId,
                    drop_loc: dropLocation,
                    pickup_loc: pickupLocation,
                }
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
         })
         .catch(err => console.error(err))
    }
    
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
                <Button color="#006400" title='select my location' onPress={() => navigation.navigate("MapTest", {addressEdit: false})}/>
                <Text style={{fontSize: 17, fontWeight:'bold'}}>{dropLocation?dropLocation.name:""}</Text>
                <View style={styles.order_sel_input_second}>
                    <TextInput style={styles.single_input} placeholder='Room No.' onChangeText={text => setRoom(text)}></TextInput>
                    <TextInput style={styles.single_input} placeholder='Phone No.' onChangeText={text => {}}></TextInput>
                </View>
            </View>
            <View style={styles.order_sel_times}>
                <Text style={styles.order_sel_text}>Select when you would like your order to be delivered</Text>
                <View style={{alignItems: 'center'}}>
                    <DateTime date={date} setDate={setDate}></DateTime>
                </View>
            </View>

            <View style={{position: 'absolute', bottom: 50}}>
                <Button title="Done"
                    disabled={!(dropLocation && selectedFoodLoc && (room || navigationMode === "updateOrder"))}
                    onPress={() => {
                        if (!navigationMode) {
                            setModalVisible(true)
                        }
                        navigationMode === "updateOrder" ? checkNewOrderFee() : checkOrderFee()
                }}/>
            </View>
            

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
                            >{navigationMode === "updateOrder" ? "Your new order fee is" : "This order costs"} {tempOrderFee?.toFixed(2)} DT</Text>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                navigation.navigate('Checkout')
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.textModalPayment}>{navigationMode === "updateOrder" ? "PAY \n DIFFERENCE" : "CHECKOUT"}</Text>
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