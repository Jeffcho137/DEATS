import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const items = [
  {
    name: "account-circle",
    text: "Profile",
    navigateTo: "Profile",
  },
  {
    name: "delivery-dining",
    text: "Deliveries",
    navigateTo: "DeliveriesTabs",
  },
  {
    name: "receipt-long",
    text: "Orders",
    navigateTo: "OrdersTabs",
  },
];

export default function TabBarBottom({ navigation, id, name, number, email, password }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        margin: "5%",
        backgroundColor: "lightgray",
        width: "87%",
        borderRadius: 20,
        zIndex: 1,
      }}
    >
      <TabMaterialCommunityIcons
        index={0}
        navigation={navigation}
        id={id}
        name={name}
        number={number}
        email={email}
        password={password}
      />
      <TabMaterialIcons
        index={1}
        navigation={navigation}
        id={id}
        name={name}
        number={number}
        email={email}
        password={password}
      />
      <TabMaterialIcons
        index={2}
        navigation={navigation}
        id={id}
        name={name}
        number={number}
        email={email}
        password={password}
      />
    </View>
  );
}

const TabMaterialCommunityIcons = ({ index, navigation, id, name, number, email, password }) => (
  <TouchableOpacity
    style={{
      padding: 25,
      alignItems: "center",
    }}
    onPress={() =>
      navigation.navigate(items[index].navigateTo, {
        id: id,
        name: name,
        number: number,
        email: email,
        password: password,
      })
    }
  >
    <MaterialCommunityIcons
      name={items[index].name}
      size={32}
      style={{
        color: "green",
        marginBottom: 2,
      }}
    />
    <Text style={{ fontSize: 15 }}>{items[index].text}</Text>
  </TouchableOpacity>
);

const TabMaterialIcons = ({ index, navigation, id, name, number, email, password }) => (
  <TouchableOpacity
    style={{
      padding: 25,
      alignItems: "center",
    }}
    onPress={() =>
      navigation.navigate(items[index].navigateTo, {
        id: id,
        name: name,
        number: number,
        email: email,
        password: password,
      })
    }
  >
    <MaterialIcons
      name={items[index].name}
      size={32}
      style={{
        color: "green",
        marginBottom: 2,
      }}
    />
    <Text>{items[index].text}</Text>
  </TouchableOpacity>
);
