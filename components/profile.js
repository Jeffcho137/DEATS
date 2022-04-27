import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { Alert, Modal, Pressable, } from "react-native";
import styles from '../style';
import ImageUpload from './image_upload';
import { useSelector } from 'react-redux';
import { selectId, selectName, selectPhoneNum, selectEmail } from '../redux/slices/userSlice';
import { DEATS_SERVER_URL, ROUTE_DELETE_ACC, ROUTE_DEACTIVATE_ACC, ROUTE_REACTIVATE_ACC, ROUTE_LOGOUT } from '../utils/Constants';

export function Profile ({ navigation }) {
    const id = useSelector(selectId)
    const name = useSelector(selectName)
    const number = useSelector(selectPhoneNum)
    const [ModalVisibleDelete, setModalVisibleDelete] = useState(false)
    const [ModalVisibleDeact, setModalVisibleDeact] = useState(false)
    const [ModalVisibleReact, setModalVisibleReact] = useState(false)
    
    const logout = () => {
        fetch(`${DEATS_SERVER_URL}${ROUTE_LOGOUT}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.succeeded == true) {
                console.log("login results:", data);
                navigation.navigate('Landing')
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.log(err));
    }

    const del_account = () => {
        fetch(`${DEATS_SERVER_URL}${ROUTE_DELETE_ACC}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.succeeded == true) {
                console.log("login results:", data);
                navigation.navigate('Landing')
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.log(err));
    }

    const deactivate_acc = () => {
        fetch(`${DEATS_SERVER_URL}${ROUTE_DEACTIVATE_ACC}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.succeeded == true) {
                console.log("login results:", data);
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.log(err));
    }

    const reactivate_acc = () => {
        fetch(`${DEATS_SERVER_URL}${ROUTE_REACTIVATE_ACC}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
            })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.succeeded == true) {
                console.log("login results:", data);
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.log(err));
    }
     
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisibleDelete}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisibleDelete(!ModalVisibleDelete);
                }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.modal_text}>
                      <Text>Are you sure you want to delete your account?</Text>
                  </View>
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setModalVisibleDelete(!ModalVisibleDelete)}}
                  >
                    <Text style={styles.textStyle}>No, take me back to profile</Text>
                  </Pressable>
                  <Pressable
                      onPress={() => {setModalVisibleDelete(!ModalVisibleDelete); del_account()}}
                  >
                    <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 5}}>delete my account</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisibleDeact}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisibleDeact(!ModalVisibleDeact);
                }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.modal_text}>
                      <Text>Are you sure you want to deactivate your account?</Text>
                  </View>
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setModalVisibleDeact(!ModalVisibleDeact)}}
                  >
                    <Text style={styles.textStyle}>No, take me back to profile</Text>
                  </Pressable>
                  <Pressable
                      onPress={() => {setModalVisibleDeact(!ModalVisibleDeact); deactivate_acc()}}
                  >
                    <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 5}}>deactivate my account</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisibleReact}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisibleReact(!ModalVisibleReact);
                }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.modal_text}>
                      <Text>React me account?</Text>
                  </View>
                  <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {setModalVisibleReact(!ModalVisibleReact)}}
                  >
                    <Text style={styles.textStyle}>No, keep me deactivated</Text>
                  </Pressable>
                  <Pressable
                      onPress={() => {setModalVisibleReact(!ModalVisibleReact); reactivate_acc()}}
                  >
                    <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 5}}>Yes! Reactivate me!</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            
            <ImageUpload/>
            <View style={styles.profile_heading}>
                <View>
                    <Text style={styles.profile_name}>{name}</Text>
                    <Text>my rating</Text>
                </View>
            </View>
            <View style={styles.phone_number}>
                <Text style={styles.profile_text}>Phone number: {number}</Text>
                <Button title='edit'></Button>
            </View>
            <View style={styles.payment}>
                <Text style={styles.profile_text}>Preferred payment method: </Text>
                <Button title='edit'></Button>
            </View>
            <Button title='delete account' onPress={() => setModalVisibleDelete(true)}></Button>
            <Button title='deactivate account' onPress={() => setModalVisibleDeact(true)}></Button>
            <Button title='reactivate account' onPress={() => setModalVisibleReact(true)}></Button>
            <View style={styles.past_orders}>
                <Text style={styles.profile_text}>Your Past Orders</Text>
            </View>
            <View style={styles.past_deliveries}>
                <Text style={styles.profile_text}>Your Past Deliveries</Text>
            </View>
            <Button title='logout' onPress={logout}></Button>
            <StatusBar style="auto" />
        </View>
    ) 
}
