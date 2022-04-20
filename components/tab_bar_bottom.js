import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabBarBottom({navigation}) {
    return (
        <View style={{ 
                flexDirection: "row",
                justifyContent: "space-around",
                margin: "5%", 
                backgroundColor: "white",
                zIndex: 1,
             }}>
            <TabMaterialCommunityIcons name="account-circle" text="Pofile" navigation={navigation}/>     
            <TabMaterialIcons name="delivery-dining" text="Deliveries" navigation={navigation}/>
            <TabMaterialIcons name="receipt-long" text="Orders" navigation={navigation}/>
        </View>
    )
}

const TabMaterialCommunityIcons = (props) => (
    <TouchableOpacity style={{
        padding: 25,
        alignItems: "center",
    }}>
        < MaterialCommunityIcons name={props.name} size={32} style={{ 
            color: "green",
            marginBottom: 2, 
          
        }}/>
        <Text style={{ fontSize: 15 }}
        >{props.text}</Text>
    </TouchableOpacity>
)

const TabMaterialIcons = (props) => (
    <TouchableOpacity style={{
        padding: 25,
        alignItems: "center"}}>
        < MaterialIcons name={props.name} size={32} style={{ 
            color: "green",
            marginBottom: 2, 
        }}/>
        <Text>{props.text}</Text>
    </TouchableOpacity>  
)