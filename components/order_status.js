import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Order_status extends Component {
    constructor(props){
        super(props)
        this.state = {
            del_id: this.props.navigation.state.params.del_id,
            del_info: this.props.navigation.state.params.del_info,
            food_place_name: this.props.navigation.state.params.food_place_name
        }
      }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.searching_text}>Delivery Confirmed!</Text>
                    <Text style={styles.searching_text}>{this.state.del_info.name} is on his way to {
                        this.state.food_place_name === "HOP" ? "the " : ""
                    } {this.state.food_place_name} </Text>
                    <Text style={styles.searching_text}>Your food is picked up</Text>
                    <Text style={styles.searching_text}>Delivered</Text>

                </View>
                
                
                <Button title="I got my food!" onPress={() => this.props.navigation.navigate('Completed')}></Button>

            
                <StatusBar style="auto" />
            </View>
        )
    }
}