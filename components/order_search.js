import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { Alert, Modal, StyleSheet, Pressable, } from "react-native";
import styles from '../style';

export class Order_search extends Component {
  constructor(props){
    super(props);
    this.state = {
        id: this.props.navigation.state.params.id,
        name: this.props.navigation.state.params.name,
        number: this.props.navigation.state.params.number,
        email: this.props.navigation.state.params.email,
        password: this.props.navigation.state.params.password,
        user_type: this.props.navigation.state.params.user_type,
        food_place: this.props.navigation.state.params.food_place,
        del_loc_lat: this.props.navigation.state.params.del_loc_lat,
        del_loc_long: this.props.navigation.state.params.del_loc_long,
        room: this.props.navigation.state.params.room,
        modalVisible: false
      }
    }
    // state = {
    //     modalVisible: false
    //   };
    
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    render() {
          const { modalVisible } = this.state.modalVisible;
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Alex is your Driver</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => this.setModalVisible(!modalVisible)}
                              >
                          <Text style={styles.textStyle}>Got it!</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => this.setModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Who's my Driver?</Text>
                </Pressable>
                <View style={styles.order_sel}>
                    <Text style={styles.searching_text}>SEARCHING</Text>
                </View>
                <Button title="Confirm" onPress={() => this.props.navigation.navigate('OrderMatch')}></Button>
                <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>
                <StatusBar style="auto" />
            </View>
            
        )
    }
}