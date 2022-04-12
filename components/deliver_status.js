import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export function Deliver_status (props) {
    return (
        <View style={styles.container}>
            <View style={styles.order_sel}>
                <Text style={styles.searching_text}>On the way to HOP</Text>
                <Text style={styles.searching_text}>Food is picked up</Text>
                <Text style={styles.searching_text}>I'm on my way</Text>
                <Text style={styles.searching_text}>I have arrived</Text>
                <Text style={styles.searching_text}>View Code</Text>
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
