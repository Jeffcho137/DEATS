import React, { useState, useCallback, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Pressable} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectId } from "../redux/slices/userSlice";
import styles from '../style'
import { static_deliveries } from "./deliveries";
import { Divider } from "react-native-elements";
import SwipeableButtons from "./swipeable_buttons";
import { setDropLocation, setOrderFee, setOrderId, setPickupLocation } from "../redux/slices/orderDeliverySlice";
import { setNavigationMode } from "../redux/slices/navigationSlice";

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

export default function Orders({ url, cat, catModifier, result_type }) {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const  userId = useSelector(selectId)
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        return () => {
            dispatch(setOrderId(null))
            dispatch(setPickupLocation(null))
            dispatch(setDropLocation(null))
            dispatch(setOrderFee(null))
            dispatch(setNavigationMode(null))
        }
    }, [])
    
    useFocusEffect(
        useCallback(() => {
          retrieveOrders(userId, setOrders)
          return () => {}
        }, [userId])
      );

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
                    <>
                        <SwipeableButtons order={item} cat={cat} catModifier={catModifier}>
                            <TouchableOpacity>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    padding: 15,
                                    paddingTop: 1,
                                    backgroundColor: "lightgray",
                                    borderRadius: 15,
                                    marginBottom: 5,
                                    marginTop: 5,
                                    width: "97%",
                                    alignSelf: "center",
                                }}>
                                    {cat === "Orders" ?
                                        (<>
                                            <OrderDetails order={item} cat={cat} catModifier={catModifier}/>
                                            <UserDetail user={item.deliverer} type="Deliverer"/>
                                            
                                        </>)
                                        : (<>
                                            <OrderDetails order={item} cat={cat} catModifier={catModifier}/>
                                            <UserDetail user={item.customer} type="Orderer"/>
                                            
                                        </>)    
                                }
                                </View>
                            </TouchableOpacity>
                        </SwipeableButtons>
                        <Divider 
                            width={1}
                            style={{ marginHorizontal: 120}}
                        />
                    </>
                )}
            />) : 
            <View style={styles.past_deliveries_cont}>
                <Text style={styles.past_deliveries_none} >No {catModifier } {cat} Yet!</Text>
                <Pressable style={styles.past_del_make} onPress={() => {
                    if (cat === "Orders") {
                        navigation.navigate('OrderSelection',{})
                    } else {
                        navigation.navigate('DeliverySelection',{})
                    }
                }}>
                    <Text style={styles.past_text}>Make {cat === "Orders" ? "an order" : "a delivery"} now!</Text>
                </Pressable>
            </View>}
       </>
    )
}
    

const OrderDetails = ({ order, cat, catModifier }) => {
    let rewardTile = "Cost"
    if (cat === "Deliveries") {
        if (catModifier === "Active") {
            rewardTile = "Will Earn"
        } else if (catModifier === "Past") {
            rewardTile = "Earned"
        } else {
            rewardTile = "Unearned"
        }
    }

    return  (
        <View style={{ width: 200, height: 90, justifyContent: "space-around" }}>
            <OrderInfoText title="Pickup from" text={order.pickup_loc.name}/>
            <OrderInfoText title="Drop at" text={order.drop_loc.name}/>
            <OrderInfoText title="Status" text={order.order_status} color2="red"/>
            <OrderReward title={rewardTile} reward={order.order_fee?.toFixed(2)} color1="green" />
        </View>
    )
}

const OrderInfoText = ({ title, text, color1, color2 }) => (
    <View style={{ flexDirection: "row", marginTop: 18 }}>
            <Text 
                style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: color1 ? color1 : "#000",
                }}
            >{title}:  </Text>
            <Text
                style={{
                    fontSize: 15,
                    color: color2 ? color2 : "#000",
                }}
            >{text?.split(",")[0]} </Text>
    </View>
)

const OrderReward = ({ title, reward, color1, color2 }) => (
    <View style={{ flexDirection: "row", marginTop: 18 }}>
            <Text 
                style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: color1 ? color1 : "#000",
                }}
            >{title}:  </Text>
            <Text
                style={{
                    fontSize: 15,
                    color: color2 ? color2 : "#000",
                }}
            >{reward} DT</Text>
    </View>
)

const UserDetail = ({ user, type}) => (
    <View
        style={{
            width: 150,
            height: 50,
            alignItems: "center",
            justifyContent: "space-between",
        }}

    >
        {user &&
            <Image 
                    source={{ uri: user?.user_info.image? user.user_info.image : static_deliveries[1].customer_img_url}} 
                    style={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 100, 
                        marginTop: 7,   
                        alignSelf: "center",
                    }} 
            />
        }

        <UserName title={type} user={user}/>
       
    </View>
)


const UserName = ({ title, user }) => (
    <View style={{ flexDirection: "row", marginTop: 18, alignItems:"center" }}>
            <Text 
                style={{
                    fontSize: 16,
                    fontWeight: "500",
                }}
            >{title}:  </Text>
            <Text
                style={{
                    fontSize: 15,
                }}
            
            >{user? user.user_info.name.split(" ")[0] : "None"}</Text>
    </View>
)



