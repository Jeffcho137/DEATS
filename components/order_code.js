import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export function Order_code (props) {
    return (
        <View style={styles.container}>
            <View style={styles.order_sel}>
                <Text style={styles.searching_text}>Enter your four digit code after ordering on GET</Text>
                <Text style={styles.searching_text}>CODE</Text> 
            </View>
            <Button title="Confirm" onPress={() => props.navigation.navigate('Profile')}></Button>
            <StatusBar style="auto" />
        </View>
    )
}


// export class Order_codeC extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.order_sel}>
//                     <Text style={styles.searching_text}>Enter your four digit code after ordering on GET</Text>
//                     <Text style={styles.searching_text}>CODE</Text>

                    
//                 </View>
                
                
//                 <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>

            
//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }