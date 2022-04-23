import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { Alert, Modal, Pressable, } from "react-native";
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectDelivererId, selectDelivererInfo, selectOrderId, selectPickupLocation, setDelivererId, setDelivererInfo } from '../redux/slices/orderDeliverySlice';

export function Order_search ({ navigation }) {
    const dispatch = useDispatch()
    const orderId = useSelector(selectOrderId)
    const delivererId = useSelector(selectDelivererId)
    const delivererInfo = useSelector(selectDelivererInfo)

    const [modalVisible, setModalVisible] = useState(false)
    
    const findDrivers = () => {
      console.log("orderId", orderId)
      fetch('https://deats-backend-test.herokuapp.com/my_deliverer/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: orderId,
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.deliverer_info)
            if (data.succeeded == true) {
              dispatch(setDelivererInfo(data.deliverer_info))
              dispatch(setDelivererId(data.deliverer_id))
              setModalVisible(true)
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.modal_text}>
                    <Text style={styles.modalText}>{delivererId ? "Deliverer found!" : "Sorry, no deliverer is available yet"}</Text>
                    <Text style={styles.deliverer_is}> {delivererId ? "Your deliverer is " + delivererInfo.name : "Check again later"}</Text>
                    <Text style={styles.deliverer_is}> {delivererId ? "Delivery fee: $3.00" : ""} </Text>
                  </View>
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setModalVisible(!modalVisible); {delivererId ? navigation.navigate('OrderMatch') : ""}}}
                  >
                    <Text style={styles.textStyle}> {delivererId ? "Accept Delivery" : "Go back"} </Text>
                  </Pressable>
                  <Pressable
                      onPress={() => {setModalVisible(!modalVisible); navigation.navigate('Home')}}
                  >
                    <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 5}}>cancel order request (this cannot be undone)</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          
            <View style={styles.order_sel}>
                <Text style={styles.searching_text}>SEARCHING...</Text>
            </View>
            <Button color="#006400" title="Refresh" onPress={findDrivers}></Button>
            <Button color="#006400" title="Cancel" onPress={() => navigation.navigate('Home')}></Button>
            <StatusBar style="auto" />
        </View> 
    )
}
