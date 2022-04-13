import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import ImageUpload from './image_upload';

export function Profile (props) {
    const id = props.navigation.state.params.id
    const name = props.navigation.state.params.name
    const number = props.navigation.state.params.number
    const email = props.navigation.state.params.email
     
    return (
        <View style={styles.container}>
            <ImageUpload/>
            <View style={styles.profile_heading}>
                <View>
                    <Text style={styles.profile_name}>{name}</Text>
                    <Text>my rating</Text>
                </View>
            </View>
            <View style={styles.phone_number}>
                <Text style={styles.profile_text}>Phone number: {number}</Text>
                <Button title='edit'></Button>
            </View>
            <View style={styles.payment}>
                <Text style={styles.profile_text}>Preferred payment method: </Text>
                <Button title='edit'></Button>
            </View>
            <View style={styles.past_orders}>
                <Text style={styles.profile_text}>Your Past Orders</Text>
            </View>
            <View style={styles.past_deliveries}>
                <Text style={styles.profile_text}>Your Past Deliveries</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    ) 
}


// export class ProfileC extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             id: this.props.navigation.state.params.id,
//             name: this.props.navigation.state.params.name,
//             number: this.props.navigation.state.params.number,
//             email: this.props.navigation.state.params.email,
//             password: this.props.navigation.state.params.password,
//         }
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.profile_heading}>
//                     <View>
//                         <Text style={styles.profile_name}>{this.state.name}</Text>
//                         <Text>my rating</Text>
//                     </View>
//                 </View>
//                 <View style={styles.phone_number}>
//                     <Text style={styles.profile_text}>Phone number: {this.state.number}</Text>
//                     <Button title='edit'></Button>
//                 </View>
//                 <View style={styles.payment}>
//                     <Text style={styles.profile_text}>Preferred payment method: </Text>
//                     <Button title='edit'></Button>
//                 </View>
//                 <View style={styles.past_orders}>
//                     <Text style={styles.profile_text}>Your Past Orders</Text>
//                 </View>
//                 <View style={styles.past_deliveries}>
//                     <Text style={styles.profile_text}>Your Past Deliveries</Text>
//                 </View>
//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }