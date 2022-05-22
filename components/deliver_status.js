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
import { DEATS_SERVER_URL, ROUTE_UPDATE_ORDER_STATUS } from "../utils/Constants";

export function Deliver_status(props) {
  const pickUpLocation = useSelector(selectPickupLocation);
  const destination = useSelector(selectDestination);
  const dropLocation = useSelector(selectDropLocation);
  const dispatch = useDispatch();
  const id = useSelector(selectId);
  const number = useSelector(selectPhoneNum);
  const order_id = useSelector(selectOrderId);
  const customer = useSelector(selectSelectedCustomer);

  const track = (status_msg) => {
    if (customer) {
      console.log("customerdebug", customer);
    }
    fetch(`${DEATS_SERVER_URL}${ROUTE_UPDATE_ORDER_STATUS}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          order_id: customer.order.order_id,
          order_status: status_msg,
        },
        user_id: customer.customer.user_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response", data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.status_text}>Are you on your way to {customer.order.pickup_loc.name}?</Text>
        <View style={styles.status_yes_button}>
          <Button
            title="Yes!"
            onPress={() => {
              track(`heading to ${customer.order.pickup_loc.name}`);
            }}
          ></Button>
        </View>
        <Text style={styles.status_text}>Food picked up?</Text>
        <View style={styles.status_yes_button}>
          <Button
            title="Yes!"
            onPress={() => {
              track("picked up");
            }}
          ></Button>
        </View>
        <Text style={styles.status_text}>On your way to {customer.order.drop_loc.name} ?</Text>
        <View style={styles.status_yes_button}>
          <Button
            title="Yes!"
            onPress={() => {
              track(`heading to ${customer.order.drop_loc.name}`);
            }}
          ></Button>
        </View>
        <Text style={styles.status_text}>Arrived?</Text>
        <View style={styles.status_yes_button}>
          <Button
            title="Yes!"
            onPress={() => {
              track("arrived");
            }}
          ></Button>
        </View>
      </View>
      <Button
        title="Reset Status"
        onPress={() => {
          track("matched");
        }}
      ></Button>
      <Button
        title="Food is delivered!"
        onPress={() => {
          track("delivered");
          props.navigation.navigate("Completed");
        }}
      ></Button>
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
