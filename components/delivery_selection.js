import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectName } from '../redux/slices/userSlice';
import { selectDestination, selectStartingPoint, setUnmatchedCustomers } from '../redux/slices/makeDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_MAKE_DEL } from '../utils/Constants';

export const makeDelivery = (userId, startPoint, destination, dispatch, navigation) => {
    console.log("delivery selection -> send -> id:", userId);
    
    fetch(`${DEATS_SERVER_URL}${ROUTE_MAKE_DEL}`,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            delivery: {
                leaving_from: startPoint,
                destination: destination
            } 
        })
    })
    .then(response => response.json())
    .then((data) => {
        console.log("server response:", data);
        console.log("type: ",Object.keys(data.unmatched_users).length)
        console.log("these are my unmatched orders", data.unmatched_users)
        dispatch(setUnmatchedCustomers(data.unmatched_users))
        navigation?.navigate('DeliverSearch')
    })
    .catch(err => console.error(err));
}


export function Delivery_selection ({ navigation }) {
    const dispatch = useDispatch()
    const userId = useSelector(selectId)
    const startPoint = useSelector(selectStartingPoint)
    const destination = useSelector(selectDestination)

    console.log("delivery selection -> id:", userId);

    
    if (!navigation.state.params?.chosen) {
        return (
            <View style={styles.container}>
                <View style={styles.deliver_sel_input}>
                    <View style={styles.order_sel_input_box}>
                        <Button color="#006400" title='select my current location and final destination' onPress={() => navigation.navigate("DelMap")}></Button>
                    </View>
                </View>
                
                <Button color="gray" title="Begin Searching"></Button>
            
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.deliver_sel_input}>
                    <Text style={styles.order_sel_text}>Leaving from:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Text>Leaving from: {startPoint?.name}</Text>
                        <Text>Going to: {destination?.name}</Text>
                        <Button title='change my starting location and final destination' onPress={() => navigation.navigate("DelMap")}></Button>
                    </View>
                </View>
                <Button title="Begin Searching" onPress={() => 
                    makeDelivery(userId, startPoint, destination, dispatch, navigation)
                }></Button>
                <StatusBar style="auto" />
            </View>
        )
    }
}
