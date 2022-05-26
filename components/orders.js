import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectId } from "../redux/slices/userSlice";
import { DEATS_SERVER_URL, ROUTE_ORDERS } from "../utils/Constants";
import styles from '../style'

const static_orders = [
    {
        id: "622273fd505bad64f71fc5a7",
        deliverer_name: "John Doe",
        pickup_loc_name: "The Hop",
        drop_loc_name: "Baker",
        order_date: "2019-01-01",
        order_status: "M",
        deliverer_img_url: "https://static.psycom.net/wp-content/uploads/2020/06/iStock-1160344267.jpg"
    },
    {
        id: "394739473974374397",
        deliverer_name: "Jooe",
        pickup_loc_name: "Collis",
        drop_loc_name: "Baker",
        order_date: "2019-01-01",
        order_status: "W",
        deliverer_img_url: "https://static.psycom.net/wp-content/uploads/2020/06/iStock-1160344267.jpg"
    },
    {
        id: "3947394739433374397",
        deliverer_name: "Jooe",
        pickup_loc_name: "Collis",
        drop_loc_name: "Baker",
        order_date: "2019-01-01",
        order_status: "W",
        deliverer_img_url: "https://static.psycom.net/wp-content/uploads/2020/06/iStock-1160344267.jpg"
    },
    {
        id: "394739474334374397",
        deliverer_name: "Jooe",
        pickup_loc_name: "Hop",
        drop_loc_name: "Baker",
        order_date: "2019-01-01",
        order_status: "W",
        deliverer_img_url: "https://static.psycom.net/wp-content/uploads/2020/06/iStock-1160344267.jpg"
    }
]

export default function Orders({ url, result_type }) {
    const navigation = useNavigation()
    const  userId = useSelector(selectId)
    const [orders, setOrders] = useState([]);
    useEffect(() =>  { retrieveOrders(userId, setOrders) }, [])

    const retrieveOrders = () => {
        fetch(url,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log("server response:", data);
            setOrders(data[result_type]);
        })
        .catch((error) => console.log(error));
      }
    
    
    return (
        <>
        {orders?.length ?
            (<FlatList
                data={orders}
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
                                source={{ uri: item.deliverer_img_url ? item.deliverer_img_url : static_orders[0].deliverer_img_url}} />
                            <OrderDetail 
                                pickUpLocation={item.pickup_loc.name}
                                dropLocation={item.drop_loc.name}
                                orderStatus={item.order_status} 
                                delvererName={item.deliverer?.user_info?.name} 
                                />
                        </View>
                    </TouchableOpacity>
                )}
            />) : 
            <View style={styles.past_deliveries_cont}>
                <Text style={styles.past_deliveries_none} >No Orders Yet!</Text>
                <Pressable style={styles.past_del_make} onPress={() => navigation.navigate('OrderSelection',{})}>
                    <Text style={styles.past_text}>Make an order now!</Text>
                </Pressable>
            </View>}
       </>
    )
}
    
const OrderDetail = ({pickUpLocation, dropLocation, orderStatus, delvererName }) => (
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
        <Text>Deliverer name: {delvererName}</Text>
    </View>
)


