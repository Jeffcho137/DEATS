import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { Alert, Modal, StyleSheet, Pressable, } from "react-native";
import styles from '../style';

export class Order_search extends Component {
  constructor(props){
    super(props)
    this.state = {
        id: this.props.navigation.state.params.id,
        name: this.props.navigation.state.params.name,
        number: this.props.navigation.state.params.number,
        email: this.props.navigation.state.params.email,
        password: this.props.navigation.state.params.password,
        user_type: this.props.navigation.state.params.user_type,
        order_id: this.props.navigation.state.params.order_id,
        modalVisible: false,
        del_info: ''
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
    
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    findDrivers = () => {
      fetch('https://deats-backend-test.herokuapp.com/my_deliverer/',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: this.state.order_id,
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log(data.deliverer_info)
            if (data.succeeded == true) {
              this.setState({
                del_info: data.deliverer_info
              })
              this.setModalVisible(true)
              // this.props.navigation.navigate('OrderMatch');
            } else {
                console.log(data.msg);
            }
        })
        .catch(err => console.error(err));
    }

    render() {
          const modalVisible = this.state.modalVisible;
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
                      <View style={styles.modal_text}>
                        <Text style={styles.modalText}>Deliverer found!</Text>
                        <Text style={styles.deliverer_is}>Your deliverer is: {this.state.del_info.name}</Text>
                        <Text style={styles.deliverer_is}>delivery fee: $3.00</Text>
                      </View>
                      {/* <Button title='Accept' onPress={this.props.navigation.navigate('OrderMatch')}></Button> */}
                      <Pressable
                          style={[styles.button, styles.buttonClose]}
                          // onPress={() => this.setModalVisible(!modalVisible)}
                          onPress={() => {this.setModalVisible(!modalVisible); this.props.navigation.navigate('OrderMatch')}}
                      >
                        <Text style={styles.textStyle}>Accept Delivery</Text>
                      </Pressable>
                      <Pressable
                          // onPress={() => this.setModalVisible(!modalVisible)}
                          onPress={() => {this.setModalVisible(!modalVisible); this.props.navigation.navigate('Home')}}
                      >
                        <Text style={{textAlign: 'center',textDecorationLine: 'underline',marginTop: 5}}>cancel order request (this cannot be undone)</Text>
                      </Pressable>
                      {/* <Button title='cancel order (this cannot be undone)' onPress={this.props.navigation.navigate('Home')}></Button> */}
                    </View>
                  </View>
                </Modal>
                {/* <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => this.setModalVisible(true)}
                >
                  <Text style={styles.textStyle}>Who's my Driver?</Text>
                </Pressable> */}
                <View style={styles.order_sel}>
                    <Text style={styles.searching_text}>SEARCHING...</Text>
                </View>
                <Button color="#006400" title="Refresh" onPress={this.findDrivers}></Button>
                <Button color="#006400" title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>

            
                <StatusBar style="auto" />

                
            </View>
            
        )
    }
}