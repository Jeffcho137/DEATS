import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../style';

export class Deliver_search extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.navigation.state.params.id,
            name: this.props.navigation.state.params.name,
            number: this.props.navigation.state.params.number,
            email: this.props.navigation.state.params.email,
            password: this.props.navigation.state.params.password,
            user_type: this.props.navigation.state.params.user_type,
            // start_loc: '',
            // fin_loc: '',
            requests: this.props.navigation.state.params.requests,
            // requests: ['id0','id1','id2'],
            // requests: [],
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

      displayCustomers = () => {
        React.Children.toArray(
            this.state.requests.map(function(customer,i){
            return(
                // <View>
                <Text>{customer.name}</Text>
                // </View>
            )
        })
        )
        
        // return(
        //     <Text>hi</Text>
        // )
      }
    
    render() {
        if (Object.keys(this.state.requests).length == 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.order_sel}>
                        <Text>SEARCHING</Text>
                        
                    </View>
                    
                    
                    <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                    <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>
                
                    <StatusBar style="auto" />
                </View>
            )
        } else {
            const API_KEY = 'AIzaSyCCkDRzY3UvSoaZa1anF9ov43ztpe6GSFk';

            const get_location = (lat, long) => {
            // let address;
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + API_KEY)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('Location: ' + JSON.stringify(responseJson));
                const location_obj = JSON.parse(JSON.stringify(responseJson))
                // console.log(typeof(location_obj.results[0]))

                // console.log(typeof(location_obj.results[0].formatted_address))
                
                let location = location_obj.results[0].formatted_address
                // if (location_obj.results[0].formatted_address == "4 E Wheelock St, Hanover, NH 03755, USA") {
                //     location = "HOP"
                //     // console.log(location)
                // }
                console.log(location)
                return location
            }).catch(error => console.log(error))
            }

            return (
                <View style={styles.container}>
                    <View style={styles.order_sel}>
                        <Text>SEARCHING</Text>
                        <View>
                            {React.Children.toArray(
                                this.state.requests.map(function(customer,i){
                                    console.log(customer.drop_loc.x)
                                return(
                                    <View>
                                        <Text>{customer.name}</Text>
                                        <Text>{get_location(customer.pickup_loc.x,customer.pickup_loc.y)}</Text>
                                        <Text>Picking up from: {get_location(customer.pickup_loc.x,customer.pickup_loc.y)}</Text>
                                        <Text>Going to: {get_location(customer.drop_loc.x,customer.drop_loc.y)}</Text>
                                        {/* <Button title="get" onPress={}></Button> */}

                                    </View>
                                )
                            }))}
                        </View>                        
                    </View>
                    <Button title="get" onPress={this.displayCustomers}></Button>
                    <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                    <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>
    
                
                    <StatusBar style="auto" />
                </View>
            )
        }
    }
}