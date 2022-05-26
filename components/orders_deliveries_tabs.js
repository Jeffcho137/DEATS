import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DEATS_SERVER_URL, ROUTE_ALL_ORDERS, ROUTE_ORDERS } from '../utils/Constants';
import Orders from './orders';
import { Order_search } from './order_search';

const Tab = createMaterialTopTabNavigator();

export default function OrdersDeliveriesTabs({ name, activeScreen, pastScreen, canceledScreen }) {
  return (
    <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen name={`Active ${name}`} component={AllOrders} />
        <Tab.Screen name={`Past ${name}`} component={Order_search} />
        <Tab.Screen name={`Canceled ${name}`} component={Order_search} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}


const AllOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_ORDERS}`} result_type={"orders"} />
    )
}