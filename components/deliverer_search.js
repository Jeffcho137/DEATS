import React, { useEffect, useState } from 'react';
import { Text, View, Button, Modal, Pressable, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import { useSelector, useDispatch, dispatch } from 'react-redux';
import styles from '../style';
import { selectId } from '../redux/slices/userSlice';
import { selectDestination, selectStartingPoint, selectUnmatchedCustomers, setSelectedCustomer } from '../redux/slices/makeDeliverySlice';
import { useClientSocket } from './client_socket';
import { makeDelivery } from './delivery_selection';
import { selectToggle } from '../redux/slices/socketSlice';
import { Divider } from 'react-native-elements';
import { static_deliveries } from './deliveries';
import SelectedCustomer from './selected_customer';

export default function DelivererSearch({ navigation }) {
    const userId = useSelector(selectId)
    const startPoint = useSelector(selectStartingPoint)
    const destination = useSelector(selectDestination)
    const unmatchedCustomers = useSelector(selectUnmatchedCustomers)
    const toggle = useSelector(selectToggle)

    console.log(userId, "toggle:", toggle)

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedCustomer, setTempSelectedCustomer] = useState(null)

    const dispatch = useDispatch()

    const [joinRoomForOrder] = useClientSocket({
        userId: userId,
        orderId: null,
        enabled: Boolean(userId)
    })

    useEffect(() => {
        makeDelivery(userId, startPoint, destination, dispatch) 
    }, [toggle])

    return (
        <>
            <FlatList 
                data={unmatchedCustomers}
                keyExtractor={(item) => item.order.order_id}
                ItemSeparatorComponent={() => {
                    return(
                        <Divider 
                            width={1.5} 
                            style={{ marginHorizontal: 110}}/>
                    )}}
                renderItem={({item: customer}) => (
                    <TouchableOpacity 
                        style={styles.orderItemStyle}
                        onPress={() => {
                            setTempSelectedCustomer(customer)
                            setModalVisible(true)
                        }}>
                        <ImageCustomer customer={customer.customer}/>
                        <OrderDetail customer={customer}/>
                    </TouchableOpacity>
                )}
            />
            <SelectedCustomer 
                modalVisible={modalVisible} 
                setModalVisible={setModalVisible} 
                selectedCustomer={selectedCustomer} 
                joinRoomForOrder={joinRoomForOrder}
                navigation={navigation}
                />
        </>
       
    )        
}

const OrderDetail = ({ customer }) => (
    <View style={{ width: 200, height: 80, justifyContent: "space-around" }}>
        <Text style={styles.usernameStyle}>{customer.customer.user_info.username}</Text>
        <OrderInfo title="Pickup from" loc_name={customer.order.pickup_loc.name}/>
        <OrderInfo title="Drop at" loc_name={customer.order.drop_loc.name}/>
    </View>
)

const OrderInfo = ({ title, loc_name }) => (
    <View style={{ flexDirection: "row"}}>
            <Text style={ styles.locationStyle }>{title}:  </Text>
            <Text>{loc_name.split(",")[0]}</Text>
    </View>
)


const ImageCustomer = ({ customer }) => (
    <Image 
        source={{ uri: customer.user_info.image? customer.user_info.image : static_deliveries[1].customer_img_url}} 
        style={{ width: 100, height: 100, borderRadius: 100 }} 
    />
)
