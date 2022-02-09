import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Home } from './components/home';
import { Order_selection } from './components/order_selection';
import { Profile } from './components/profile';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile},
    Order_selection: { screen: Order_selection},
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
