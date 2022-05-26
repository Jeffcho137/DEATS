import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function OrdersDeliveriesTabs({ name, activeScreen, pastScreen, canceledScreen }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name={`Active ${name}`} component={activeScreen} />
      <Tab.Screen name={`Past ${name}`} component={pastScreen} />
      <Tab.Screen name={`Canceled ${name}`} component={canceledScreen} />
    </Tab.Navigator>
  );
}