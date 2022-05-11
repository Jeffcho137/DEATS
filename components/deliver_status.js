import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput } from "react-native";
import styles from "../style";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStartingPoint,
  selectDestination,
  setDestination,
  selectSelectedCustomer,
} from "../redux/slices/makeDeliverySlice";
import {
  selectDelivererInfo,
  selectDropLocation,
  selectPickupLocation,
  selectOrderId,
} from "../redux/slices/orderDeliverySlice";
import { selectId, selectPhoneNum } from "../redux/slices/userSlice";
import { DEATS_SERVER_URL, ROUTE_UPDATE_ORDER } from "../utils/Constants";

export function Deliver_status(props) {
  const pickUpLocation = useSelector(selectPickupLocation);
  const destination = useSelector(selectDestination);
  const dropLocation = useSelector(selectDropLocation);
  const dispatch = useDispatch();
  const id = useSelector(selectId);
  const number = useSelector(selectPhoneNum);
  const order_id = useSelector(selectOrderId);
  const customer = useSelector(selectSelectedCustomer);

  const track = (order_status) => {
    //console.log("orderId", orderId)
    fetch(`${DEATS_SERVER_URL}${ROUTE_UPDATE_ORDER}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: customer.customer_id,
        order_id: customer.order_id,
        pickup_loc: customer.pickup_loc,
        pickup_loc_name: customer.pickup_loc_name,
        drop_loc: customer.drop_loc,
        drop_loc_name: customer.drop_loc_name,
        order_status: order_status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response", data);
        //   console.log(data.deliverer_info)
        //   if (data.succeeded == true) {
        //     dispatch(setDelivererInfo(data.deliverer_info))
        //     dispatch(setDelivererId(data.deliverer_id))
        //     setModalVisible(true)
        //   } else {
        //       console.log(data.msg);
        //   }
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.status_text}>Are you on your way to {customer.pickup_loc_name} ?</Text>
        <View style={styles.status_yes_button}>
          <Button
            title="Yes!"
            onPress={() => {
              console.log("customer", customer);
              track("C");
            }}
          ></Button>
        </View>
        <Text style={styles.status_text}>Food picked up?</Text>
        <View style={styles.status_yes_button}>
          <Button
            title="Yes!"
            onPress={() => {
              track("F");
            }}
          ></Button>
        </View>
        <Text style={styles.status_text}>On your way to {customer.drop_loc_name} ?</Text>
        <View style={styles.status_yes_button}>
          <Button
            title="Yes!"
            onPress={() => {
              track("M");
            }}
          ></Button>
        </View>
        <Text style={styles.status_text}>Arrived?</Text>
        <View style={styles.status_yes_button}>
          <Button
            title="Yes!"
            onPress={() => {
              track("W");
            }}
          ></Button>
        </View>
      </View>
      <Button title="Food is delivered!" onPress={() => props.navigation.navigate("Completed")}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

// export class Deliver_statusC extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.order_sel}>
//                     <Text style={styles.searching_text}>On the way to HOP</Text>
//                     <Text style={styles.searching_text}>Food is picked up</Text>
//                     <Text style={styles.searching_text}>I'm on my way</Text>
//                     <Text style={styles.searching_text}>I have arrived</Text>
//                     <Text style={styles.searching_text}>View Code</Text>

//                 </View>

//                 <Button title="Food is delivered!" onPress={() => this.props.navigation.navigate('Completed')}></Button>

//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }
