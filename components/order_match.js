import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectDelivererInfo } from '../redux/slices/orderDeliverySlice';
import { MaterialIcons } from '@expo/vector-icons';
import { COLOR_CROCODILE } from '../utils/Constants';

export function Order_match ({ navigation }) {
    const delivererInfo = useSelector(selectDelivererInfo)
      
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 50, marginTop: -100}}>
            < MaterialIcons name="celebration" size={50} style={{ 
                    color: COLOR_CROCODILE,
                    alignSelf: 'center',
                    // marginTop: 20,
                    // marginBottom: 50,
                }}/>
                < MaterialIcons name="celebration" size={50} style={{ 
                    color: COLOR_CROCODILE,
                    alignSelf: 'center',
                    // marginTop: 20,
                    // marginBottom: 50,
                }}/>
                < MaterialIcons name="celebration" size={50} style={{ 
                    color: COLOR_CROCODILE,
                    alignSelf: 'center',
                    // marginTop: 20,
                    // marginBottom: 50,
                }}/>
            </View>
            
            <View style={{flex: 0.2, backgroundColor: 'lightgrey', borderWidth: 1, borderRadius: 15, borderColor: 'black', justifyContent: 'center', width: '85%', alignItems: 'center'}}>
                <Text style={{fontSize: 22,
                marginBottom: 20,
                fontWeight: 'bold',
                color: COLOR_CROCODILE,
                }}> {delivererInfo.name} is your deliverer!</Text>
                <Text>Please confirm to see your delivery updates</Text>
            </View>
            <View style={{position: 'absolute', bottom: 50}}>
                <Button title="Confirm" onPress={() => navigation.navigate('OrderStatus')}></Button>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}
