import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Delivery_selection } from "./components/delivery_selection";
import { Home } from "./components/home";
import { Order_selection } from "./components/order_selection";
import { Profile } from "./components/profile";
import { Order_search } from "./components/order_search";
import { Deliver_search } from "./components/deliver_search";
import { Deliver_match } from "./components/deliver_match";
import { Order_match } from "./components/order_match";
import { Order_code } from "./components/order_code";
import Orders from "./components/orders";
import { Order_status } from "./components/order_status";
import { Deliver_status } from "./components/deliver_status";
import { Completed } from "./components/completed";
import { Signup } from "./components/signup";
import Map_test from "./components/map";
import Del_map from "./components/deliverer_map";
import { Login } from "./components/login";
import { Landing } from "./components/landing";
import { Logo } from './components/image.js';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Deliveries from "./components/deliveries";
import SSOLogin from "./components/sso_login";
import { DateTime } from "./components/date_time";

const AppNavigator = createStackNavigator(
  {
    DateTime: { screen: DateTime },
    SSOLogin: { screen: SSOLogin },
    Landing: { screen: Landing },
    Signup: { screen: Signup },
    
    Login: { screen: Login },
    Home: { screen: Home },
    Profile: { screen: Profile },
    OrderSelection: { screen: Order_selection },
    DeliverySelection: { screen: Delivery_selection },
    OrderSearch: { screen: Order_search },
    DeliverSearch: { screen: Deliver_search },
    DeliverMatch: { screen: Deliver_match },
    Deliveries: { screen: Deliveries },
    OrderMatch: { screen: Order_match },
    OrderCode: { screen: Order_code },
    OrderStatus: { screen: Order_status },
    Orders: { screen: Orders },
    DeliverStatus: { screen: Deliver_status },
    Completed: { screen: Completed },
    
    MapTest: { screen: Map_test },
    DelMap: { screen: Del_map },
  },

  {
    initialRouteParams: "SSSLogin",
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}
