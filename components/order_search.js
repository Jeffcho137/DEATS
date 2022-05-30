import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { Alert, Modal, Pressable, } from "react-native";
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectDelivererId, selectDelivererInfo, selectOrderId, setDelivererId, setDelivererInfo } from '../redux/slices/orderDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_MY_DELIVERER } from '../utils/Constants';
import { useClientSocket } from './client_socket';
import { selectId, selectPaymentIntentId } from '../redux/slices/userSlice';
// import { Bubbles } from 'react-native-4-bubbles-loader';
import { BubblesLoader, CirclesLoader } from 'react-native-indicator';
import ProgressBar from 'react-native-progress/Bar';
import { CircleSnail } from 'react-native-progress';
import { Circle } from 'react-native-progress';

export function Order_search ({ navigation }) {
    const dispatch = useDispatch()
    const userId = useSelector(selectId)
    const orderId = useSelector(selectOrderId)
    const paymentIntentId = useSelector(selectPaymentIntentId)
    const delivererId = useSelector(selectDelivererId)
    const delivererInfo = useSelector(selectDelivererInfo)

    const [modalVisible, setModalVisible] = useState(false)

    console.log("current deliverer:", delivererId)

    useClientSocket({
      userId: userId,
      orderId: orderId,
      paymentIntentId: paymentIntentId,
      enabled: Boolean(userId)
  })

    useEffect(() => {
        if (delivererId) {
          setModalVisible(true)
        } else {
          setModalVisible(false)
        }
    }, [delivererId])

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
                    {/* Use delivererInfo, object of concern, for condition to avoid undefined errors when delivererId updates earlier and a re-render is triggered */}
                    <Text style={styles.modalText}>{delivererInfo ? "Deliverer found!" : "Sorry, no deliverer is available yet"}</Text>
                    <Text style={styles.deliverer_is}> {delivererInfo ? "Your deliverer is " + delivererInfo.name : "Check again later"}</Text>
                    <Text style={styles.deliverer_is}> {delivererInfo ? "Delivery fee: $3.00" : ""} </Text>
                  </View>
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setModalVisible(!modalVisible); {delivererId ? navigation.navigate('OrderMatch') : ""}}}
                  >
                    <Text style={styles.textStyle}> {delivererId ? "Accept Delivery" : "Go back"} </Text>
                  </Pressable>
                  <Pressable
                      onPress={() => {
                        //setModalVisible(!modalVisible)
                        dispatch(setDelivererInfo(null))
                        dispatch(setDelivererId(null))
                        navigation.navigate('Home')}}
                  >
                    <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 5}}>cancel order request (this cannot be undone)</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
                <Text style={{
                  height: 30,
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>SEARCHING FOR A DELIVERER :)</Text>
                <Text>Please be patient</Text>
            </View>
            <Circle size={50} indeterminate={true} />
            {/* <View style={{position: 'absolute', top: 300}}>
              <Progress.CircleSnail size={100} animating={true} indeterminate={true} />
            </View> */}
            <View style={styles.cancel_order}>
              <Button color="#006400" title="cancel my order" onPress={() => navigation.navigate('Home')}></Button>
            </View>
            {/* <Button color="#006400" title="Refresh" onPress={findDrivers}></Button> */}
            <StatusBar style="auto" />
        </View> 
    )
}
