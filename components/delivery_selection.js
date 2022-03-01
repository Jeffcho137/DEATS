import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Delivery_selection extends Component {
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
            start_loc: '',
            fin_loc: '',
        }
    }

    componentDidMount() {
        console.log("componentDidMount fired");
        console.log("STATE", this.state);
    }
    
    componentDidUpdate() {
        console.log("componentDidUpdate fired");
        console.log("STATE", this.state);
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
                    <Text style={styles.order_sel_text}>I want to pick up food from:</Text>
                    <View style={styles.order_sel_place_options}>
                        <View style={styles.order_sel_single_place}>
                            <Button color='black' title='HOP' onPress={this.hopChosen}></Button>
                        </View>
                        <View style={styles.order_sel_single_place}>
                            <Button color='black' title='Collis' onPress={this.collisChosen}></Button>
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