import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Pressable} from "react-native";
import { useSelector } from "react-redux";
import { selectId } from "../redux/slices/userSlice";
import { DEATS_SERVER_URL, ROUTE_DELIVERIES } from "../utils/Constants";
import styles from "../style"

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

const retrieveDeliveries = (user_id, setUserDeliveries) => {
    fetch(`${DEATS_SERVER_URL}${ROUTE_DELIVERIES}`,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user_id,
        })
    })
    .then(response => response.json())
    .then((data) => {
        console.log("id", user_id);
        console.log("data", data);
        console.log("deliveries", data.deliveries);
        setUserDeliveries(data.deliveries);
    })
    .catch((error) => console.log(error));
  }

export default function Deliveries({ navigation }) {
    const id = useSelector(selectId)
    const [user_deliveries, setUserDeliveries] = useState([]);
    useEffect(() =>  { retrieveDeliveries(id, setUserDeliveries) }, [])
    
    return (
        <>
        {/* {console.log("user_deliveries", user_deliveries.length, user_deliveries)} */}
        {user_deliveries?.length ? 
            (<FlatList
                data={user_deliveries}
                keyExtractor={(item) => item._id}
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
                                source={{ uri: item.customer_img_url ? item.customer_img_url : static_deliveries[0].customer_img_url }} />
                            <OrderDetail 
                                pickUpLocation={item.pickup_loc.name}
                                dropLocation={item.drop_loc.name}
                                orderStatus={item.order_status} 
                                customerName={item.customer.user_info.name} 
                                />
                        </View>
                    </TouchableOpacity>
                )}
            />) : 
            <View style={styles.past_deliveries_cont}>
                <Text style={styles.past_deliveries_none} >No Deliveries Yet!</Text>
                <Pressable style={styles.past_del_make} onPress={() => navigation.navigate('DeliverySelection')}>
                    <Text style={styles.past_text}>Make a delivery now!</Text>
                </Pressable>
            </View>}
       </>
    )
}
    
const OrderDetail = ({pickUpLocation, dropLocation, orderStatus, customerName }) => (
    <View style={{ width: "50%", marginLeft: 15}}>
        <Text style={{
            fontSize: 18,
            fontWeight: "bold",
        }}>From: {pickUpLocation}</Text>
        <Text style={{
            fontSize: 16,
            fontWeight: "500",
        }}>To: {dropLocation}</Text>
        <Text
            style={{
                fontSize: 15,
                fontWeight: "400",
            }}
        >Status: {orderStatus}</Text>
        <Text>Customer name: {customerName}</Text>
    </View>
)


