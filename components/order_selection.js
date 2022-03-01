import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Order_selection extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.navigation.state.params.id,
            name: this.props.navigation.state.params.name,
            number: this.props.navigation.state.params.number,
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            user_type: this.props.navigation.state.params.user_type,
            food_place: '',
            building: '',
            room: '',
            start_time: 0,
            end_time: 0,
        }
    }

    hopChosen = () => {
        this.setState({
            food_place: 'HOP'
        })
    }

    collisChosen = () => {
        this.setState({
            food_place: 'Collis'
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text style={styles.order_sel_text}>I want food from:</Text>
                    <View style={styles.order_sel_place_options}>
                        <View style={styles.order_sel_single_place}>
                            <Button color='black' title='HOP' onPress={this.hopChosen}></Button>
                        </View>
                        <View style={styles.order_sel_single_place}>
                            <Button color='black' title='Collis' onPress={this.collisChosen}></Button>
                        </View>
                    </View>
                </View>
                <View style={styles.order_sel_input}>
                    <Text style={styles.order_sel_text}>Deliver to:</Text>
                    <View style={styles.order_sel_input_box}>
                        <TextInput style={styles.single_input} placeholder='building name or street address' onChangeText={text => this.setState({building: text})}></TextInput>
                        <TextInput style={styles.single_input} placeholder='room number' onChangeText={text => this.setState({room: text})}></TextInput>
                        <TextInput style={styles.single_input} placeholder={this.state.number} onChangeText={text => this.setState({number: text})}></TextInput>
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
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('MapTest')}></Button>
            
                <StatusBar style="auto" />
            </View>
        )
    }
}