import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Delivery_selection } from './components/delivery_selection';
import { Home } from './components/home';
import { Order_selection } from './components/order_selection';
import { Profile } from './components/profile';
import { Order_search } from './components/order_search';
import { Deliver_search } from './components/deliver_search';
import { Deliver_match } from './components/deliver_match';
import { Order_match } from './components/order_match';
import { Order_code } from './components/order_code';
import { Order_status } from './components/order_status';
import { Deliver_status} from './components/deliver_status';
import { Completed } from './components/completed';
import { Map_test } from './components/map';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile},
    OrderSelection: { screen: Order_selection},
    DeliverySelection: { screen: Delivery_selection},
    OrderSearch: { screen: Order_search},
    DeliverSearch: { screen: Deliver_search},
    DeliverMatch: { screen: Deliver_match},
    OrderMatch: { screen: Order_match},
    OrderCode: { screen: Order_code},
    OrderStatus: { screen: Order_status},
    DeliverStatus: { screen: Deliver_status},
    Completed: { screen: Completed},
    MapTest: { screen: Map_test}
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
