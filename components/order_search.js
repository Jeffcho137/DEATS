import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { Alert, Modal, StyleSheet, Pressable, } from "react-native";
import styles from '../style';

export class Order_search extends Component {
    state = {
        modalVisible: false
      };
    
      setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    render() {
          const { modalVisible } = this.state;
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
                    <Text style={styles.searching_text}>SEARCHING...</Text>
                    
                </View>
                
                
                
                <Button color="#006400" title="Confirm" onPress={() => this.props.navigation.navigate('OrderMatch')}></Button>
                <Button color="#006400" title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>

            
                <StatusBar style="auto" />

                
            </View>
            
        )
    }
}