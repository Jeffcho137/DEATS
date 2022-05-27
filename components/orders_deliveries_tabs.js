import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DEATS_SERVER_URL, ROUTE_ACTIVE_DELIVERIES, ROUTE_ACTIVE_ORDERS, ROUTE_ALL_DELIVERIES, ROUTE_ALL_ORDERS, ROUTE_CANCELED_DELIVERIES, ROUTE_CANCELED_ORDERS, ROUTE_ORDERS, ROUTE_PAST_DELIVERIES, ROUTE_PAST_ORDERS } from '../utils/Constants';
import Orders from './orders';

const Tab = createMaterialTopTabNavigator();

const OrdersDeliveriesTabs = ({ name, activeScreen, pastScreen, canceledScreen }) => {
  return (
    <Tab.Navigator>
        <Tab.Screen name={`Active ${name}`} component={activeScreen} />
        <Tab.Screen name={`Past ${name}`} component={pastScreen} />
        <Tab.Screen name={`Canceled ${name}`} component={canceledScreen} />
    </Tab.Navigator>
  );
}

export function OrdersTabs() {
    return (
        <OrdersDeliveriesTabs name="Orders" activeScreen={ActiveOrders} pastScreen={PastOrders} canceledScreen={CanceledOrders} />
    )
}

export function DeliveriesTabs () {
    return (
        <OrdersDeliveriesTabs name="Deliveries" activeScreen={ActiveDeliveries} pastScreen={PastDeliveries} canceledScreen={CanceledDeliveries} />
    )
}

const AllOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_ALL_ORDERS}`} cat="Orders" result_type={"all_orders"} />
    )
}

const ActiveOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_ACTIVE_ORDERS}`} cat="Orders" catModifier={"Active"} result_type={"active_orders"} />
    )
}

const PastOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_PAST_ORDERS}`} cat="Orders" catModifier={"Past"} result_type={"past_orders"} />
    )
}

const CanceledOrders = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_CANCELED_ORDERS}`} cat="Orders" catModifier={"Canceled"} result_type={"canceled_orders"} />
    )
}

const AllDeliveries = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_ALL_DELIVERIES}`} cat="Deliveries" result_type={"all_deliveries"} />
    )
}

const ActiveDeliveries = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_ACTIVE_DELIVERIES}`} cat="Deliveries" catModifier={"Active"} result_type={"active_deliveries"} />
    )
}

const PastDeliveries = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_PAST_DELIVERIES}`} cat="Deliveries" catModifier={"Past"} result_type={"past_deliveries"} />
    )
}

const CanceledDeliveries = () => {
    return (
        <Orders url={`${DEATS_SERVER_URL}${ROUTE_CANCELED_DELIVERIES}`} cat="Deliveries" catModifier={"Canceled"} result_type={"canceled_deliveries"} />
    )
}
