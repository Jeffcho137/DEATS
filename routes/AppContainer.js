import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Delivery_selection, Home, Order_selection, Profile , Order_search
, Deliver_search, Deliver_match , Order_match , Order_code, Order_status, 
Deliver_status, Completed, Signup, Map_test, Login, Landing } from './../index';

const AppNavigator = createStackNavigator(
  {
    Landing: { screen: Landing },
    Signup: { screen: Signup },
    Login: { screen: Login },
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
    initialRouteName: 'Landing',
  }
);
export default createAppContainer(AppNavigator);  
