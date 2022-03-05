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
    
    render() {
        if (this.state.requests.length == 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.order_sel}>
                        <Text>There are currently no order requests in our system. Please try again later. </Text>
                        
                    </View>
                    
                    
                    <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                    <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>
                
                    <StatusBar style="auto" />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.order_sel}>
                        <Text>SEARCHING</Text>
                        {/* {this.fetchUsers()} */}
                        
                    </View>
                    
                    <Button title="get" onPress={this.fetchUsers}></Button>
                    <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>
                    <Button title="Cancel" onPress={() => this.props.navigation.navigate('Home')}></Button>
    
                
                    <StatusBar style="auto" />
                </View>
            )
        }
    }
}