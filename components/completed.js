import React, { Component, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';
import { MaterialIcons } from '@expo/vector-icons';
import { setDelivererId, setDelivererInfo } from '../redux/slices/orderDeliverySlice';
import { COLOR_CROCODILE, COLOR_GREEN, COLOR_PICKLE } from '../utils/Constants';

export function Completed (props) {
    

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: COLOR_GREEN, fontSize: 30,width: 500, height: 500,borderRadius: 250, borderWidth: 1, justifyContent: 'center', marginTop: -300}}>
            < MaterialIcons name="check-circle-outline" size={100} style={{ 
                    color: "white",
                    alignSelf: 'center',
                    marginTop: 20,
                    // marginBottom: 2, 
                }}/>
                <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold' ,textAlign: 'center', marginTop: 50}}>Thanks for using DEATS!</Text>
            </View>
            <View style={{marginTop: 100, backgroundColor: 'lightgrey', borderWidth: 1, borderRadius: 15, padding: 15}}>
                <Button title="Back to home" color={"green"} onPress={() => props.navigation.replace('Home')}></Button>
            </View>
            <StatusBar style="auto" />
        </View>
    )
    
}


// export class CompletedC extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.order_sel}>
//                     <Text style={styles.searching_text}>Thanks for using DEATS!</Text>
                    

//                 </View>
                
                
//                 <Button title="Back to home" onPress={() => this.props.navigation.navigate('Home')}></Button>

            
//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }