import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, Modal, Pressable} from 'react-native';
import styles from '../style';

export class Deliver_search extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id,
            name: this.props.navigation.state.params.name,
            number: this.props.navigation.state.params.number,
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            user_type: this.props.navigation.state.params.user_type,
            // start_loc: '',
            // fin_loc: '',
            // requests: [],
            requests: this.props.navigation.state.params.requests,
            modal: false,
            error_msg: '',
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

    fetchUsers = async () => {
        try {
          const response = await fetch(
            'https://deats-backend-test.herokuapp.com/show_users/'
          );
          const data = await response.json();
          console.log(data.registered_users);
        //   return(
        //       <Text>{json}</Text>
        //   )
        } catch (error) {
          console.error(error);
        }
      };
    render() {
        if (Object.keys(this.state.requests).length == 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.order_sel}>
                        <Text>There are currently no deliery requests</Text>
                    </View>
                    {/* <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                    <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button> */}
                
                    <StatusBar style="auto" />
                </View>
            )
        } else {
            const error_msg = this.state.error_msg;
            const modal = this.state.modal;
            const displayModal = (bool) => {
                this.setState({modal: bool})
            }
            const match = (orderId) => {
                console.log(orderId)
                console.log(this.state.id)
                fetch('https://deats-backend-test.herokuapp.com/match/',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.state.id,
                        order_id: orderId,
                    })
                })
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.succeeded == 1) {
                        displayModal(false);
                        this.props.navigation.navigate('DeliverMatch')
                    } else {
                        console.log(data.msg);
                        this.setState({
                            error_msg: data.msg,
                        })
                    }
                })
                .catch(err => console.error(err));
            }
            return (
                <View style={styles.container}>
                    <View style={styles.del_search_all_requests}>
                        <Text style={styles.del_search_current_requests}>Current Requests:</Text>
                        <View style={styles.del_search_requests}>
                            {React.Children.toArray(
                                this.state.requests.map(function(customer,i){
                                return(
                                    <View>
                                        <Modal
                                            // animationType="slide"
                                            visible={modal}
                                            transparent={true}
                                        >
                                            <View style={styles.centeredView}>
                                                <View style={styles.modalView}>
                                                    <View style={styles.del_modal_text}>
                                                        <Text style={{fontSize: 18}}>{customer.name}</Text>
                                                        <Text style={{fontSize: 18}}>Picking up from: {customer.pickup_loc_name}</Text>
                                                        <Text style={{fontSize: 18}}>Going to: {customer.drop_loc_name}</Text>
                                                        <Text style={{color:'red'}}>{error_msg}</Text>
                                                    </View>
                                                    <View style={styles.del_modal_buttons}>
                                                        <Pressable style={styles.del_modaL_cancel} onPress={() => displayModal(false)}>
                                                            <Text style={{fontSize: 15, textAlign: 'center'}}>Cancel</Text>
                                                        </Pressable>
                                                        <Pressable style={styles.del_modaL_match} onPress={() => match(customer.order_id)}>
                                                            <Text style={{fontSize: 15, textAlign: 'center'}}>Match!</Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                        </Modal>
                                        <Pressable onPress={() => displayModal(true)} style={styles.del_search_single_request}>
                                            <Text style={{fontSize: 18, textAlign: 'center'}}>{customer.name}</Text>
                                            <Text style={{fontSize: 18, textAlign: 'center'}}>Picking up from: {customer.pickup_loc_name}</Text>
                                            <Text style={{fontSize: 18, textAlign: 'center'}}>Going to: {customer.drop_loc_name}</Text>
                                            {/* <Button title="get" onPress={}></Button> */}

                                        </Pressable>
                                    </View>
                                )
                            }))}
                        </View>                        
                    </View>
                    <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>
    
                
                    <StatusBar style="auto" />
                </View>
            )
        }
    }
}