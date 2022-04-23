import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectId, selectName } from '../redux/slices/userSlice';
import { selectDestination, selectStartingPoint } from '../redux/slices/makeDeliverySlice';

export function Delivery_selection ({ navigation }) {
    const id = useSelector(selectId)
    const startPoint = useSelector(selectStartingPoint)
    const destination = useSelector(selectDestination)

    console.log("delivery selection -> id:", id);

    const sendDelivererInfo = () => {
        console.log("delivery selection -> send -> id:", id);
        
        fetch('https://deats-backend-test.herokuapp.com/make_del/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                final_des: {
                    x: destination.lat,
                    y: destination.long
                },
                num: 3
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log("type: ",Object.keys(data.unmatched_users).length)
            console.log("these are my unmatched orders", data.unmatched_users)
            
            navigation.navigate('DeliverSearch')
        })
        .catch(err => console.error(err));
    }

    if (navigation.state.params?.chosen) {
        return (
            <View style={styles.container}>
                <View style={styles.deliver_sel_input}>
                    <View style={styles.order_sel_input_box}>
                        <Button color="#006400" title='select my current location and final destination' onPress={() => navigation.navigate("DelMap")}></Button>
                    </View>
                </View>
                
                <Button color="#006400" title="Begin Searching" onPress={sendDelivererInfo}></Button>
            
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.deliver_sel_input}>
                    <Text style={styles.order_sel_text}>Leaving from:</Text>
                    <View style={styles.order_sel_input_box}>
                        <Text>Leaving from: {startPoint?.address}</Text>
                        <Text>Going to: {destination?.address}</Text>
                        <Button title='change my starting location and final destination' onPress={() => navigation.navigate("DelMap")}></Button>
                    </View>
                </View>
                <Button title="Begin Searching" onPress={sendDelivererInfo}></Button>
                <StatusBar style="auto" />
            </View>
        )
    }
}
