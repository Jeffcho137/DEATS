import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Order_match extends Component {
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
                    <Text style={styles.searching_text}> {this.state.del_info.name} is your deliverer</Text>
                    
                </View>
                
                
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('OrderStatus', {
                    del_id: this.state.del_id,
                    del_info: this.state.del_info,
                    food_place_name: this.state.food_place_name
                }

                )}></Button>

            
                <StatusBar style="auto" />
            </View>
        )
    }
}