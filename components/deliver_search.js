import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, Modal, Pressable} from 'react-native';
import styles from '../style';

export function Deliver_search (props) {
   
    const id = props.navigation.state.params.id
    const requests = props.navigation.state.params.requests

    const [modal, setModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [i, setI] = useState(0)

    if (Object.keys(requests).length == 0) {
        return (
            <View style={styles.container}>
                <View style={styles.order_sel}>
                    <Text>There are currently no deliery requests</Text>
                </View>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        let customers = []
        const displayModal = (bool, customer=null, i=null) => {
            console.log("customer", customer)
            setModal(bool)
            setI(i)
        }

        const match = (orderId) => {
            fetch('https://deats-backend-test.herokuapp.com/match/',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    order_id: orderId,
                })
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                console.log("delivery search -> id:", data.id)
                if (data.succeeded == 1) {
                    props.navigation.navigate('DeliverMatch')
                } else {
                    console.log(data.msg);
                    setErrorMsg(data.msg)
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
                            requests.map(function(customer, i){
                            customers[i] = customer;
                            console.log(i)
                            return(
                                <View>
                                    <Pressable onPress={() => displayModal(true, customers[i].pickup_loc_name, i)} style={styles.del_search_single_request}>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>{customer.name}</Text>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>Picking up from: {customer.pickup_loc_name}</Text>
                                        <Text style={{fontSize: 18, textAlign: 'center'}}>Going to: {customer.drop_loc_name}</Text>
                                    </Pressable>
                                </View>
                            )
                        }))}
                    </View>          
                    
                    <Modal
                        visible={modal}
                        transparent={true}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.del_modal_text}>
                                    <Text style={{fontSize: 18}}>{customers[i].name}</Text>
                                    <Text style={{fontSize: 18}}>Picking up from: {customers[i].pickup_loc_name}</Text>
                                    <Text style={{fontSize: 18}}>Going to: {customers[i].drop_loc_name}</Text>
                                    <Text style={{color:'red'}}>{errorMsg}</Text>
                                </View>
                                <View style={styles.del_modal_buttons}>
                                    <Pressable style={styles.del_modaL_cancel} onPress={() => displayModal(false, customers[i].name, i)}>
                                        <Text style={{fontSize: 15, textAlign: 'center'}}>Cancel</Text>
                                    </Pressable>
                                    <Pressable style={styles.del_modaL_cancel} onPress={() => {
                                        displayModal(false, customers[i].name, i);
                                        match(customers[i].order_id);
                                        }}>
                                        <Text style={{fontSize: 15, textAlign: 'center'}}>Match!</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>              
                </View>
                <Button title="Cancel" onPress={() => props.navigation.navigate('Home')}></Button>
                <StatusBar style="auto" />
            </View>
        )
    }
}


// export class Deliver_search extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             id: this.props.navigation.state.params.id,
//             name: this.props.navigation.state.params.name,
//             number: this.props.navigation.state.params.number,
//             email: this.props.navigation.state.params.email,
//             password: this.props.navigation.state.params.password,
//             user_type: this.props.navigation.state.params.user_type,
//             // start_loc: '',
//             // fin_loc: '',
//             // requests: [],
//             requests: this.props.navigation.state.params.requests,
//             modal: false,
//             error_msg: '',
//             i: 0,
//         }
//     }

//     componentDidMount() {
//         console.log("componentDidMount fired");
//         console.log("STATE", this.state);
//     }
    
//     componentDidUpdate() {
//         console.log("componentDidUpdate fired");
//         console.log("STATE", this.state);
//     }

//     fetchUsers = async () => {
//         try {
//           const response = await fetch(
//             'https://deats-backend-test.herokuapp.com/show_users/'
//           );
//           const data = await response.json();
//           console.log(data.registered_users);
//         //   return(
//         //       <Text>{json}</Text>
//         //   )
//         } catch (error) {
//           console.error(error);
//         }
//       };
//     render() {
//         if (Object.keys(this.state.requests).length == 0) {
//             return (
//                 <View style={styles.container}>
//                     <View style={styles.order_sel}>
//                         <Text>There are currently no deliery requests</Text>
//                     </View>
//                     {/* <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
//                     <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button> */}
                
//                     <StatusBar style="auto" />
//                 </View>
//             )
//         } else {
//             const error_msg = this.state.error_msg;
//             const modal = this.state.modal;
//             let customers = []
//             const displayModal = (bool,customer=null,i=null) => {
//                 console.log("customer",customer)
//                 // console.log("i:",i)
//                 this.setState({modal: bool, i: i})
//             }
//             const match = (orderId) => {
//                 // console.log(orderId)
//                 // console.log(this.state.id)
//                 fetch('https://deats-backend-test.herokuapp.com/match/',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         id: this.state.id,
//                         order_id: orderId,
//                     })
//                 })
//                 .then(response => response.json())
//                 .then((data) => {
//                     console.log(data)
//                     if (data.succeeded == 1) {
//                         this.props.navigation.navigate('DeliverMatch')
//                     } else {
//                         console.log(data.msg);
//                         this.setState({
//                             error_msg: data.msg,
//                         })
//                     }
//                 })
//                 .catch(err => console.error(err));
//             }
//             return (
//                 <View style={styles.container}>
//                     <View style={styles.del_search_all_requests}>
//                         <Text style={styles.del_search_current_requests}>Current Requests:</Text>
//                         <View style={styles.del_search_requests}>
//                             {React.Children.toArray(
//                                 this.state.requests.map(function(customer,i){
//                                 customers[i] = customer;
//                                 console.log(i)
//                                 return(
//                                     <View>
//                                         <Pressable onPress={() => displayModal(true,customers[i].pickup_loc_name,i)} style={styles.del_search_single_request}>
//                                             <Text style={{fontSize: 18, textAlign: 'center'}}>{customer.name}</Text>
//                                             <Text style={{fontSize: 18, textAlign: 'center'}}>Picking up from: {customer.pickup_loc_name}</Text>
//                                             <Text style={{fontSize: 18, textAlign: 'center'}}>Going to: {customer.drop_loc_name}</Text>
//                                             {/* <Button title="get" onPress={}></Button> */}

//                                         </Pressable>
//                                     </View>
//                                 )
//                             }))}
//                         </View>          
//                         <Modal
//                             // animationType="slide"
//                             visible={modal}
//                             transparent={true}
//                         >
//                             <View style={styles.centeredView}>
//                                 <View style={styles.modalView}>
//                                     <View style={styles.del_modal_text}>
//                                         <Text style={{fontSize: 18}}>{customers[this.state.i].name}</Text>
//                                         <Text style={{fontSize: 18}}>Picking up from: {customers[this.state.i].pickup_loc_name}</Text>
//                                         <Text style={{fontSize: 18}}>Going to: {customers[this.state.i].drop_loc_name}</Text>
//                                         <Text style={{color:'red'}}>{error_msg}</Text>
//                                     </View>
//                                     <View style={styles.del_modal_buttons}>
//                                         <Pressable style={styles.del_modaL_cancel} onPress={() => displayModal(false,customers[this.state.i].name,this.state.i)}>
//                                             <Text style={{fontSize: 15, textAlign: 'center'}}>Cancel</Text>
//                                         </Pressable>
//                                         {/* <Pressable style={styles.del_modaL_match} onPress={() => {displayModal(false); match(customers[this.state.i].order_id)}}> */}
//                                         <Pressable style={styles.del_modaL_cancel} onPress={() => {displayModal(false,customers[this.state.i].name,this.state.i);match(customers[this.state.i].order_id); }}>
//                                             <Text style={{fontSize: 15, textAlign: 'center'}}>Match!</Text>
//                                         </Pressable>
//                                     </View>
//                                 </View>
//                             </View>
//                         </Modal>              
//                     </View>
//                     <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>
    
                
//                     <StatusBar style="auto" />
//                 </View>
//             )
//         }
//     }
// }