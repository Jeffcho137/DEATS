import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DEATS_SERVER_URL, ROUTE_ACTIVE_ORDERS, ROUTE_ALL_ORDERS, ROUTE_CANCELED_ORDERS, ROUTE_ORDERS, ROUTE_PAST_ORDERS } from '../utils/Constants';
import Orders from './orders';
import { Order_search } from './order_search';

const Tab = createMaterialTopTabNavigator();

export default function OrdersDeliveriesTabs({ name, activeScreen, pastScreen, canceledScreen }) {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name={`Active ${name}`} component={ActiveOrders} />
            <Tab.Screen name={`Past ${name}`} component={PastOrders} />
            <Tab.Screen name={`Canceled ${name}`} component={CanceledOrders} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const AllOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_ORDERS}`} result_type={"all_orders"} />
    )
}

const ActiveOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_ACTIVE_ORDERS}`} result_type={"active_orders"} />
    )
}

const PastOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_PAST_ORDERS}`} result_type={"past_orders"} />
    )
}

const CanceledOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_CANCELED_ORDERS}`} result_type={"canceled_orders"} />
    )
}
