
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectName } from '../redux/slices/userSlice';
import { selectDestination, selectStartingPoint, setUnmatchedCustomers } from '../redux/slices/makeDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_MAKE_DEL } from '../utils/Constants';
import React, { Component } from 'react';
import  Logo  from './image_small.js';
import TabBarBottom from './tab_bar_bottom';

export function Payment ({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.del_search_current_requests}>Payment Information:</Text>
            <View style={styles.home_profile_button}>
                 <Logo/>
            </View>
            <View style={styles.home_options}>
                
                <Modal
                        visible={modal}
                        transparent={true}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.del_modal_text}>
                                    <Text style={{fontSize: 18}}>Review Order</Text>
                                    <Text style={{color:'red'}}>{errorMsg}</Text>
                                </View>
                                <View style={styles.del_modal_buttons}>
                                    <Pressable style={styles.del_modaL_cancel} onPress={() => displayModal(false, "Payment Total: ", i)}>
                                        <Text style={{fontSize: 15, textAlign: 'center'}}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={styles.del_modaL_cancel} onPress={() => {
                                        displayModal(false, "Payment Total: ", i);
                
                                        }}>
                                        <Text style={{fontSize: 15, textAlign: 'center'}}>Submit Order</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal> 
            </View>
            <StatusBar style="auto" />
            <TabBarBottom navigation={navigation}/>
            <Button title="Cancel" onPress={() => navigation.navigate('Home')}></Button>
            <StatusBar style="auto" />
        </View>
        
    )
}

