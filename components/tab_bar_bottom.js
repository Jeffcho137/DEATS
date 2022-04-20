import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const items= [
    {
        name:"account-circle",
        text:"Pofile",
        navigateTo: "Profile"
    },
    {
        name:"delivery-dining",
        text:"Deliveries",
        navigateTo: "Deliveries"
    },
    {
        name:"receipt-long",
        text:"Orders",
        navigateTo: "Deliveries"
    }
]

export default function TabBarBottom(props) {
    return (
        <View style={{ 
                flexDirection: "row",
                justifyContent: "space-around",
                margin: "5%", 
                backgroundColor: "white",
                zIndex: 1,
             }}>
            <TabMaterialCommunityIcons index={0} 
                navigation={props.navigation}
                id={props.navigation.state.params.id}
                name={props.navigation.state.params.name}
                number={props.navigation.state.params.number}
                email={props.navigation.state.params.email} 
                password={props.navigation.state.params.password}/>     
            <TabMaterialIcons index={1} 
                navigation={props.navigation}
                id={props.navigation.state.params.id}
                name={props.navigation.state.params.name}
                number={props.navigation.state.params.number}
                email={props.navigation.state.params.email} 
                password={props.navigation.state.params.password}/>
            <TabMaterialIcons index={2} 
                navigation={props.navigation}
                id={props.navigation.state.params.id}
                name={props.navigation.state.params.name}
                number={props.navigation.state.params.number}
                email={props.navigation.state.params.email} 
                password={props.navigation.state.params.password}/>
        </View>
    )
}

const TabMaterialCommunityIcons = ({index, navigation, ...props}) => (
    <TouchableOpacity style={{
        padding: 25,
        alignItems: "center",
        }}
        onPress={() => navigation.navigate(items[index].navigateTo, 
            {id: navigation.state.params.id,
            name: navigation.state.params.name,
            number: navigation.state.params.number,
            email: navigation.state.params.email, 
            password: navigation.state.params.password})}
    >
        < MaterialCommunityIcons name={items[index].name} size={32} style={{ 
            color: "green",
            marginBottom: 2, 
          
        }}/>
        <Text style={{ fontSize: 15 }}
        >{items[index].text}</Text>
    </TouchableOpacity>
)

const TabMaterialIcons = ({index, navigation, ...props}) => (
    <TouchableOpacity style={{
        padding: 25,
        alignItems: "center"}}
        onPress={() => navigation.navigate(items[index].navigateTo, )}
    >
        < MaterialIcons name={items[index].name} size={32} style={{ 
            color: "green",
            marginBottom: 2, 
        }}/>
        <Text>{items[index].text}</Text>
    </TouchableOpacity>  
)