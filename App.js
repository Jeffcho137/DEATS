import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Delivery_selection } from './components/delivery_selection';
import { Home } from './components/home';
import { Order_selection } from './components/order_selection';
import { Profile } from './components/profile';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile},
    OrderSelection: { screen: Order_selection},
    DeliverySelection: { screen: Delivery_selection}
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);  
export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
