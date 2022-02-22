import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Delivery_selection extends Component {
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
                <View style={styles.deliver_sel_input}>
                    <Text style={styles.order_sel_text}>Leaving from:</Text>
                    <View style={styles.order_sel_input_box}>
                        <TextInput style={styles.single_input} placeholder='building name or street address'></TextInput>
                    </View>
                </View>
                <View style={styles.deliver_sel_input}>
                    <Text style={styles.order_sel_text}>Going to:</Text>
                    <View style={styles.order_sel_input_box}>
                        <TextInput style={styles.single_input} placeholder='building name or street address'></TextInput>
                    </View>
                </View>
                
                <Button title="Begin Searching" onPress={() => this.props.navigation.navigate('DeliverSearch')}></Button>
            
                <StatusBar style="auto" />
            </View>
        )
    }
}