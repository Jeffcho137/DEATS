import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Order_selection extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>I want food from:</Text>
                    <View style={styles.order_sel_place_options}>
                        <View style={styles.order_sel_single_place}>
                            <Button color='black' title='HOP'></Button>
                        </View>
                        <View style={styles.order_sel_single_place}>
                            <Button color='black' title='Collis'></Button>
                        </View>
                    </View>
                </View>
                <View style={styles.order_sel_input}>
                    <Text style={styles.order_sel_text}>Deliver to:</Text>
                    <View style={styles.order_sel_input_box}>
                        <TextInput style={styles.single_input} placeholder='building name or street address'></TextInput>
                        <TextInput style={styles.single_input} placeholder='room number'></TextInput>
                        <TextInput style={styles.single_input} placeholder='phone number'></TextInput>
                    </View>
                </View>
                <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>I want my food between</Text>
                    <View style={styles.order_sel_times}>
                        <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                        <Text style={styles.order_sel_times_text}>and</Text>
                        <TextInput style={styles.single_input_times} placeholder='time'></TextInput>
                    </View>
                </View>
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
            
                <StatusBar style="auto" />
            </View>
        )
    }
}