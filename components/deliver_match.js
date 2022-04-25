import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectStartingPoint, selectDestination, setDestination } from '../redux/slices/makeDeliverySlice';
import { selectDelivererInfo, selectPickupLocation, setPickupLocation, selectDropLocation } from '../redux/slices/orderDeliverySlice';

export function Deliver_match (props) {
    const pickUpLocation = useSelector(selectPickupLocation)
    const dropLocation = useSelector(selectDropLocation)

    return (
        <View style={styles.container}>
            <View style={styles.order_sel}>
                <Text style={styles.searching_text}>Deliver to {dropLocation.address} from {pickUpLocation.address}</Text>            
            </View>
            <Button title="Confirm" onPress={() => props.navigation.navigate('DeliverStatus')}></Button>
            <StatusBar style="auto" />
        </View>
    )
}


// export class Deliver_matchC extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.order_sel}>
//                     <Text style={styles.searching_text}>Deliver to LSC from HOP</Text>
                    
//                 </View>
                
                
//                 <Button title="Confirm" onPress={() => this.props.navigation.navigate('DeliverStatus')}></Button>

            
//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }