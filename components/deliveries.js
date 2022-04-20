import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity} from "react-native";

const static_deliveries = [
    {
        id: "622273fd505bad64f71fc5a7",
        customer_name: "John Doe",
        pickup_loc_name: "The Hop",
        drop_loc_name: "Baker",
        order_date: "2019-01-01",
        order_status: "M",
        customer_img_url: "https://static.psycom.net/wp-content/uploads/2020/06/iStock-1160344267.jpg"
    },
    {
        id: "394739473974374397",
        customer_name: "Jooe",
        pickup_loc_name: "Collis",
        drop_loc_name: "Baker",
        order_date: "2019-01-01",
        order_status: "W",
        customer_img_url: "https://static.psycom.net/wp-content/uploads/2020/06/iStock-1160344267.jpg"
    },
    {
        id: "3947394739433374397",
        customer_name: "Jooe",
        pickup_loc_name: "Collis",
        drop_loc_name: "Baker",
        order_date: "2019-01-01",
        order_status: "W",
        customer_img_url: "https://static.psycom.net/wp-content/uploads/2020/06/iStock-1160344267.jpg"
    },
    {
        id: "394739474334374397",
        customer_name: "Jooe",
        pickup_loc_name: "Hop",
        drop_loc_name: "Baker",
        order_date: "2019-01-01",
        order_status: "W",
        customer_img_url: "https://static.psycom.net/wp-content/uploads/2020/06/iStock-1160344267.jpg"
    }
]

const retrieveDeliveries = (id, setUserDeliveries) => {
    fetch('https://deats-backend-test.herokuapp.com/deliveries/',
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
        })
    })
    .then(response => response.json())
    .then((data) => {
        console.log("id", id);
        console.log("data", data);
        console.log("deliveries", data.deliveries);
        setUserDeliveries(data.deliveries);
    })
    .catch((error) => console.log(error));
  }

export default function Deliveries({navigation}) {
    console.log("navigation", navigation);
    const [user_deliveries, setUserDeliveries] = useState(static_deliveries);
    useEffect(() =>  { retrieveDeliveries(navigation.state.params.id, setUserDeliveries) });
    
    return (
        <>
        {console.log("user_deliveries", user_deliveries.length, user_deliveries)}
        {user_deliveries.length > 2 ? // debug why length of the empty list is non-zero later
            (<FlatList
                data={user_deliveries}
                keyExtractor={(item) => item.id}
                vertical
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 45
                        
                        }}>
                            <Image 
                                style={{ width: "50%", height: "100%", borderRadius: 25, marginRight: 15}}
                                source={{ uri: item.deliverer_img_url }} />
                            <OrderDetail 
                                pickUpLocation={item.pickup_loc_name}
                                dropLocation={item.drop_loc_name}
                                orderStatus={item.order_status} 
                                customerName={item.customer_name} 
                                />
                        </View>
                    </TouchableOpacity>
                )}
            />) : 
            <Text style={{
                fontSize: 20,
                fontWeight: "bold"
            }} >No Deliveries</Text>}
       </>
    )
}
    
const OrderDetail = ({pickUpLocation, dropLocation, orderStatus, customerName }) => (
    <View style={{ width: "50%", marginLeft: 15}}>
        <Text style={{
            fontSize: 18,
            fontWeight: "bold",
        }}>Picked up from: {pickUpLocation}</Text>
        <Text style={{
            fontSize: 16,
            fontWeight: "500",
        }}>Delivered to: {dropLocation}</Text>
        <Text
            style={{
                fontSize: 15,
                fontWeight: "400",
            }}
        >Delivery status: {orderStatus}</Text>
        <Text>Customer name: {customerName}</Text>
    </View>
)

