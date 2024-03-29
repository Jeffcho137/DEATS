import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Modal, Pressable} from 'react-native';
import styles from '../style';
import { useSelector, useDispatch, dispatch } from 'react-redux';
import { selectId } from '../redux/slices/userSlice';
import { selectDestination, selectStartingPoint, selectUnmatchedCustomers, setSelectedCustomer } from '../redux/slices/makeDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_MATCH } from '../utils/Constants';
import { useClientSocket } from './client_socket';
import { makeDelivery } from './delivery_selection';
import { selectToggle } from '../redux/slices/socketSlice';

export function Deliver_search ({ navigation }) {
    const dispatch = useDispatch()

    const userId = useSelector(selectId)
    const startPoint = useSelector(selectStartingPoint)
    const destination = useSelector(selectDestination)
    const unmatchedCustomers = useSelector(selectUnmatchedCustomers)
    const toggle = useSelector(selectToggle)

    console.log(userId, "toggle:", toggle)

    const [modal, setModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [i, setI] = useState(0)

    const [joinRoomForOrder] = useClientSocket({
        userId: userId,
        orderId: null,
        enabled: Boolean(userId)
    })

    useEffect(() => {
        makeDelivery(userId, startPoint, destination, dispatch) 
    }, [toggle])

    if (unmatchedCustomers && !Object.keys(unmatchedCustomers).length) {
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
                    user_info: {
                    },
                    order_id: orderId,
                })
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                console.log("delivery search -> id:", data?.id)
                if (data.succeeded == 1) {
                    // only add the deliverer to the order room only if they succeed in matching the customer
                    joinRoomForOrder(orderId)
                    navigation.navigate('DeliverMatch')
                    
                } else {
                    console.log(data?.msg);
                    setErrorMsg(data?.msg)
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

                            ///
                            dispatch(setSelectedCustomer(customers[i]))

                            return(
                                <View>
                                    <Pressable onPress={() => displayModal(true, customers[i].order.pickup_loc.name, i)} style={styles.del_search_single_request}>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>{customer?.customer?.user_info?.name}</Text>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>Picking up from: {customer?.order?.pickup_loc?.name}</Text>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>Going to: {customer?.order?.drop_loc?.name}</Text>
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
                                    <Text style={{fontSize: 18}}>{customers[i]?.customer?.user_info?.name}</Text>
                                    <Text style={{fontSize: 18}}>Picking up from: {customers[i]?.order?.pickup_loc?.name}</Text>
                                    <Text style={{fontSize: 18}}>Going to: {customers[i]?.order?.drop_loc?.name}</Text>
                                    <Text style={{color:'red'}}>{errorMsg}</Text>
                                </View>
                                <View style={styles.del_modal_buttons}>
                                    <Pressable style={styles.del_modaL_cancel} onPress={() => displayModal(false, customers[i]?.name, i)}>
                                        <Text style={{fontSize: 15, textAlign: 'center'}}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={styles.del_modaL_cancel} onPress={() => {
                                        displayModal(false, customers[i]?.name, i);
                                        match(customers[i]?.order?.order_id);
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
