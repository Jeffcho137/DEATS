import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import ImageUpload from './image_upload';
import { useSelector } from 'react-redux';
import { selectId, selectName, selectPhoneNum, selectEmail } from '../redux/slices/userSlice';

export function Profile ({ navigation }) {
    const name = useSelector(selectName)
    const number = useSelector(selectPhoneNum)
     
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
