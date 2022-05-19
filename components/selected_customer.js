import React, { useState } from 'react';
import { Text, View, Modal, Pressable, Image} from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedCustomer } from '../redux/slices/makeDeliverySlice';
import styles from '../style';
import { DEATS_SERVER_URL, ROUTE_MATCH } from '../utils/Constants';
import { static_deliveries } from './deliveries';

export default function SelectedCustomer({modalVisible, setModalVisible, selectedCustomer, joinRoomForOrder, navigation}) {
    dispatch = useDispatch()
    const [errorMsg, setErrorMsg] = useState("")

    const match = (orderId) => {
        fetch(`${DEATS_SERVER_URL}${ROUTE_MATCH}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_info: {
                },
                order_id: orderId,
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log("delivery search -> id:", data.id)
            if (data.succeeded == 1) {
                // only add the deliverer to the order room only if they succeed in matching the customer
                console.log('beforeroomjoin', orderId)
                joinRoomForOrder(orderId)
                console.log('selecteddebug', selectedCustomer)
                dispatch(setSelectedCustomer(selectedCustomer))
                navigation.navigate('DeliverMatch')
                
            } else {
                console.log(data.msg);
                setErrorMsg(data.msg)
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <Modal 
            animationType="slide" 
            visible={modalVisible} 
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.del_modal_text}>
                            <Image 
                                source={{ uri: selectedCustomer?.customer.user_info.image? selectedCustomer.user_info.image : static_deliveries[1].customer_img_url}} 
                                style={{ width: 120, height: 120, borderRadius: 15, alignSelf: "center" }} 
                            />
                            <Text style={styles.modalNameStyle}>{selectedCustomer?.customer.user_info.name}</Text>
                            <Text style={styles.modalUsernameStyle}>({selectedCustomer?.customer.user_info.username})</Text>
                            <OrderInfo title="Pickup location" loc_name={selectedCustomer?.order.pickup_loc.name}/>
                            <OrderInfo title="Drop location" loc_name={selectedCustomer?.order.drop_loc.name}/>
                            <Text style={{color:'red'}}>{errorMsg}</Text>
                        </View>
                        <View style={styles.del_modal_buttons}>
                            <Pressable style={styles.del_modaL_cancel} onPress={() => {
                                setModalVisible(false)
                                setErrorMsg("")
                            }}>
                                <Text style={{fontSize: 15, textAlign: 'center'}}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.del_modaL_cancel} onPress={() => {
                                match(selectedCustomer?.order.order_id);

                                if (!errorMsg) {
                                    setModalVisible(false)
                                }
                            }}>
                                <Text style={{fontSize: 15, textAlign: 'center'}}>Match!</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
        </Modal>
    )
}

const OrderInfo = ({ title, loc_name }) => (
    <View style={{ 
        marginBottom: 10
    }}>
            <Text style={ styles.modalLocDescriptionStyle }>{title}</Text>
            <Text style={ styles.modalLocationStyle }>{loc_name}</Text>
    </View>
)
