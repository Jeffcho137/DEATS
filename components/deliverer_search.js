import React, { useEffect, useState } from 'react';
import { Text, View, Button, Modal, Pressable, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import { useSelector, useDispatch, dispatch } from 'react-redux';
import styles from '../style';
import { selectId } from '../redux/slices/userSlice';
import { selectDestination, selectStartingPoint, selectUnmatchedCustomers, setSelectedCustomer } from '../redux/slices/makeDeliverySlice';
import { DEATS_SERVER_URL, ROUTE_MATCH } from '../utils/Constants';
import { useClientSocket } from './client_socket';
import { makeDelivery } from './delivery_selection';
import { selectToggle } from '../redux/slices/socketSlice';
import { Divider } from 'react-native-elements';
import { static_deliveries } from './deliveries';

export default function DelivererSearch({ navigation }) {
    const userId = useSelector(selectId)
    const startPoint = useSelector(selectStartingPoint)
    const destination = useSelector(selectDestination)
    const unmatchedCustomers = useSelector(selectUnmatchedCustomers)
    const toggle = useSelector(selectToggle)

    return (
        <FlatList 
            data={unmatchedCustomers}
            keyExtractor={(item) => item.order.order_id}
            ItemSeparatorComponent={() => {
                return(
                    <Divider 
                        width={1.5} 
                        style={{ marginHorizontal: 110}}/>
                )}}
            renderItem={({item: {customer, order}}) => (
                <TouchableOpacity 
                    style={styles.orderItemStyle}>
                    <ImageCustomer customer={customer}/>
                    <OrderDetail customer={customer} order={order}/>
                </TouchableOpacity>
            )}
        />
    )        
}

const OrderDetail = ({ customer, order}) => (
    <View style={{ width: 200, height: 80, justifyContent: "space-around" }}>
        <Text style={styles.usernameStyle}>{customer.user_info.username}</Text>

        <View style={{ flexDirection: "row" }}>
            <Text style={ styles.locationStyle }>Pickup from:  </Text>
            <Text>{order.pickup_loc.name.split(",")[0]}</Text>
        </View>

        <View style={{ flexDirection: "row"}}>
            <Text style={ styles.locationStyle }>Drop at:  </Text>
            <Text>{order.drop_loc.name.split(",")[0]}</Text>
        </View>
    </View>
)

const ImageCustomer = ({ customer }) => (
    <Image 
        source={{ uri: customer.user_info.image? customer.user_info.image : static_deliveries[1].customer_img_url}} 
        style={{ width: 100, height: 100, borderRadius: 100 }} 
    />
)
