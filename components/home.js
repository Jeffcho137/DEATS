import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Button } from 'react-native';
import styles from '../style';
import  Logo  from './image_small.js';
import TabBarBottom from './tab_bar_bottom';
import DEATSNotifications from './notifications';

export function Home ({ navigation }) {
    DEATSNotifications()
    return (
        <View style={styles.container}>
            <View style={styles.home_profile_button}>
                 <Logo/>
            </View>
            <View style={styles.home_options}>
                <View style={styles.home_buttons}>
                    <Button color="#006400" title="Order Delivery" onPress={() => navigation.navigate('OrderSelection', {})}></Button>
                </View>
                <View style={styles.home_buttons}>
                    <Button color="#006400"title="Make Delivery" onPress={() => navigation.navigate('DeliverySelection')}></Button>
                </View>
            </View>
            <StatusBar style="auto" />
            <TabBarBottom navigation={navigation}/>
        </View>
    )
}
