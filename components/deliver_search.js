import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Modal, Pressable} from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectId } from '../redux/slices/userSlice';
import { selectUnmatchedCustomers } from '../redux/slices/makeDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_MATCH } from '../utils/Constants';

export function Deliver_search ({ navigation }) {
   
    const id = useSelector(selectId)
    const unmatchedCustomers = useSelector(selectUnmatchedCustomers)

    const [modal, setModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [i, setI] = useState(0)

    if (!Object.keys(unmatchedCustomers).length) {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text>There are currently no deliery requests</Text>
                </View>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        let customers = []
        const displayModal = (bool, customer=null, i=null) => {
            console.log("customer", customer)
            setModal(bool)
            setI(i)
        }

        const match = (orderId) => {
            fetch(`${DEATS_SERVER_URL}${ROUTE_MATCH}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    order_id: orderId,
                })
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                console.log("delivery search -> id:", data.id)
                if (data.succeeded == 1) {
                    navigation.navigate('DeliverMatch')
                } else {
                    console.log(data.msg);
                    setErrorMsg(data.msg)
                }
            })
            .catch(err => console.error(err));
        }

        return (
            <View style={styles.container}>
                <View style={styles.del_search_all_requests}>
                    <Text style={styles.del_search_current_requests}>Current Requests:</Text>
                    <View style={styles.del_search_requests}>
                        {React.Children.toArray(
                            unmatchedCustomers.map(function(customer, i){
                            customers[i] = customer;
                            console.log(i)
                            return(
                                <View>
                                    <Pressable onPress={() => displayModal(true, customers[i].order.pickup_loc.name, i)} style={styles.del_search_single_request}>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>{customer.customer.user_info.name}</Text>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>Picking up from: {customer.order.pickup_loc.name}</Text>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>Going to: {customer.order.drop_loc.name}</Text>
                                    </Pressable>
                                </View>
                            )
                        }))}
                    </View>          
                    
                    <Modal
                        visible={modal}
                        transparent={true}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.del_modal_text}>
                                    <Text style={{fontSize: 18}}>{customers[i].name}</Text>
                                    <Text style={{fontSize: 18}}>Picking up from: {customers[i].pickup_loc_name}</Text>
                                    <Text style={{fontSize: 18}}>Going to: {customers[i].drop_loc_name}</Text>
                                    <Text style={{color:'red'}}>{errorMsg}</Text>
                                </View>
                                <View style={styles.del_modal_buttons}>
                                    <Pressable style={styles.del_modaL_cancel} onPress={() => displayModal(false, customers[i].name, i)}>
                                        <Text style={{fontSize: 15, textAlign: 'center'}}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={styles.del_modaL_cancel} onPress={() => {
                                        displayModal(false, customers[i].name, i);
                                        match(customers[i].order_id);
                                        }}>
                                        <Text style={{fontSize: 15, textAlign: 'center'}}>Match!</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>              
                </View>
                <Button title="Cancel" onPress={() => navigation.navigate('Home')}></Button>
                <StatusBar style="auto" />
            </View>
        )
    }
}
