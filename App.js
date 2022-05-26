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
import {Order_review} from "./components/order_review";
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
import DelivererSearch from "./components/deliverer_search";
import SSOLogout from "./components/sso_logout";
import logout, { logoutBackButton } from "./components/logout";
import { StripeProvider } from "@stripe/stripe-react-native";
import { PUBLISHABLE_KEY_TEST } from "./utils/Constants";
import Checkout from "./components/checkout";
import OrdersDeliveriesTabs from "./components/orders_deliveries_tabs";

const AppNavigator = createStackNavigator(
  {
    SSOLogin: { screen: SSOLogin },
    SSOLogout: { screen: SSOLogout },
    Landing: { screen: Landing },
    Signup: { screen: Signup },
    
    Login: { screen: Login },
    Home: { screen: Home },
    Profile: { screen: Profile },
    OrderSelection: { screen: Order_selection },
    DeliverySelection: { screen: Delivery_selection },
    OrderSearch: { screen: Order_search },
    DeliverSearch: { screen: Deliver_search },
    DelivererSearch: { screen: DelivererSearch },
    Checkout: { screen: Checkout },
    DeliverMatch: { screen: Deliver_match },
    Deliveries: { screen: Deliveries },
    OrderMatch: { screen: Order_match },
    OrderCode: { screen: Order_code },
    OrderStatus: { screen: Order_status },
    OrderReview: {screen: Order_review },
    OrdersDeliveriesTabs: { screen: OrdersDeliveriesTabs },
    Orders: { screen: Orders },
    DeliverStatus: { screen: Deliver_status },
    Completed: { screen: Completed },
    
    MapTest: { screen: Map_test },
    DelMap: { screen: Del_map },
  },

  {
    initialRouteParams: "SSSLogin",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

Home['navigationOptions'] = screenProps => (logout(screenProps));
Profile['navigationOptions'] = screenProps => (logout(screenProps));
Delivery_selection['navigationOptions'] = screenProps => (logout(screenProps));
Del_map['navigationOptions'] = screenProps => (logout(screenProps));
DelivererSearch['navigationOptions'] = screenProps => (logout(screenProps));
Deliver_match['navigationOptions'] = screenProps => (logout(screenProps));
Deliver_status['navigationOptions'] = screenProps => (logout(screenProps));
Deliveries['navigationOptions'] = screenProps => (logout(screenProps));
Order_selection['navigationOptions'] = screenProps => (logout(screenProps));
Map_test['navigationOptions'] = screenProps => (logout(screenProps));
Order_search['navigationOptions'] = screenProps => (logout(screenProps));
Order_match['navigationOptions'] = screenProps => (logout(screenProps));
Order_status['navigationOptions'] = screenProps => (logout(screenProps));
Order_review['navigationOptions'] = screenProps => (logout(screenProps));
Order_code['navigationOptions'] = screenProps => (logout(screenProps));
Orders['navigationOptions'] = screenProps => (logout(screenProps));
SSOLogout['navigationOptions'] = () => (logoutBackButton());

const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return (
      <StripeProvider
        merchantIdentifier='merchant.identifier' 
        publishableKey={PUBLISHABLE_KEY_TEST}
      >
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </StripeProvider>
    );
  }
}
