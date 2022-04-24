import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectStartingPoint, selectDestination, setDestination } from '../redux/slices/makeDeliverySlice';
import { selectDelivererInfo, selectPickupLocation, setPickupLocation } from '../redux/slices/orderDeliverySlice';


export function Deliver_status (props) {
    const pickUpLocation = useSelector(selectPickupLocation)
    const destination = useSelector(selectDestination) 
    return (
        <View style={styles.container}>
            <View style={styles.status}>
                <Text style={styles.status_text}>Are you on your way to {pickUpLocation.address} ?</Text> 
                <View style={styles.status_yes_button}>
                    <  Button title="Yes!" ></Button>
                </View>
                <Text style={styles.status_text}>Food picked up?</Text>
                <View style={styles.status_yes_button}>
                    <  Button title="Yes!" ></Button>
                </View>
                <Text style={styles.status_text}>On your way to {destination.address} ?</Text>
                <View style={styles.status_yes_button}>
                    <  Button title="Yes!" ></Button>
                </View>
                <Text style={styles.status_text}>Arrived?</Text>
                <View style={styles.status_yes_button}>
                    <  Button title="Yes!" ></Button>
                </View>
            </View>
            <Button title="Food is delivered!" onPress={() => props.navigation.navigate('Completed')}></Button>
            <StatusBar style="auto" />
        </View>
    )
}


// export class Deliver_statusC extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.order_sel}>
//                     <Text style={styles.searching_text}>On the way to HOP</Text>
//                     <Text style={styles.searching_text}>Food is picked up</Text>
//                     <Text style={styles.searching_text}>I'm on my way</Text>
//                     <Text style={styles.searching_text}>I have arrived</Text>
//                     <Text style={styles.searching_text}>View Code</Text>


//                 </View>
                
                
//                 <Button title="Food is delivered!" onPress={() => this.props.navigation.navigate('Completed')}></Button>

            
//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }
