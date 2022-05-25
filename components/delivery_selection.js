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
        navigation?.navigate('DelivererSearch')
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
                {/* <View style={styles.deliver_sel_input}> */}
                    <View style={styles.del_sel_input_box}>
                        <Button color="#006400" title='select my current location and final destination' onPress={() => navigation.navigate("DelMap")}></Button>
                    </View>
                {/* </View> */}
                
                <View style={{position: 'absolute', bottom: 50}}>
                    <Button color="gray" style={{position: 'absolute', bottom: 10}} title="Begin Searching"></Button>
                </View>
            
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.deliver_sel_input}>
                    <Text style={styles.del_confirm_text}>Please confirm that your starting location and final destination are correct</Text>
                    <View style={styles.del_sel_locations}>
                        <View style={{marginBottom: 20}}>
                            <Text style={styles.del_sel_loc_text}>Leaving from:</Text>
                            <Text style={{fontSize: 17}}>{startPoint?.name}</Text>
                        </View>
                        <View style={{marginBottom: 40}}>
                            <Text style={styles.del_sel_loc_text}>Going to:</Text>
                            <Text style={{fontSize: 17}}>{destination?.name}</Text>
                        </View>
                        <Button title='change my starting location and final destination' onPress={() => navigation.navigate("DelMap")}></Button>
                    </View>
                </View>

                <View style={{position: 'absolute',bottom:50}}>
                    <Button title="Begin Searching" onPress={() => 
                    makeDelivery(userId, startPoint, destination, dispatch, navigation)
                }></Button>
                </View>

                <StatusBar style="auto" />
            </View>
        )
    }
}
