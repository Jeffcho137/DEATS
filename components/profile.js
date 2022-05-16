import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Modal, Pressable } from 'react-native';
import styles from '../style';
import ImageUpload from './image_upload';
import { useSelector, useDispatch, dispatch } from 'react-redux';
import { selectId, selectName, setPhoneNum, selectPhoneNum} from '../redux/slices/userSlice';
import { TextInput } from 'react-native-gesture-handler';

export function Profile ({ navigation }) {
    const dispatch = useDispatch()

    const name = useSelector(selectName)
    const number = useSelector(selectPhoneNum)
    
    const [modal, setModal] = useState(false)
    const [typedNumber, setTypedNumber] = useState("")

    const displayModal = (modal, num) => {
        setModal(!modal);
    }

    const updateNum = (num) => {
        dispatch(setPhoneNum(num))
        setModal(false)
    }
    return (
        <View style={styles.container}>
            <Modal
                visible={modal}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.del_modal_text}>
                            <Text>type you updated number below</Text>
                            <TextInput style={styles.login_input} placeholder={number} onChangeText={text => setTypedNumber(text)}></TextInput>
                        </View>
                        <View style={styles.del_modal_buttons}>
                            <Pressable style={styles.del_modaL_cancel} onPress={() => displayModal(modal)}>
                                <Text style={{fontSize: 15, textAlign: 'center'}}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.del_modaL_cancel} onPress={() => updateNum(typedNumber)}>
                                <Text style={{fontSize: 15, textAlign: 'center'}}>Update</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <ImageUpload />
            <View style={styles.profile_heading}>
                <View>
                    <Text style={styles.profile_name}>{name}</Text>
                    {/* <Text>my rating</Text> */}
                </View>
            </View>
            <View style={styles.phone_number}>
                <Text style={styles.profile_text}>Phone number: {number}</Text>
                <Pressable style={styles.del_search_single_request} onPress={() => displayModal(modal)}>
                    <Text>edit</Text>
                </Pressable>
            </View>
            {/* <View style={styles.payment}>
                <Text style={styles.profile_text}>Preferred payment method: </Text>
                <Button title='edit'></Button>
            </View> */}
            {/* <View style={styles.past_orders}>
                <Text style={styles.profile_text}>Your Past Orders</Text>
            </View>
            <View style={styles.past_deliveries}>
                <Text style={styles.profile_text}>Your Past Deliveries</Text>
            </View> */}
            <StatusBar style="auto" />
        </View>
    ) 
}
