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
import { selectId, selectPhoneNum, setDEATSTokens } from "../redux/slices/userSlice";
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
        if (data.succeeded == true) {
          dispatch(setDEATSTokens(data.user.DEATS_tokens))
        } else {
          console.log(data.msg);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <View style={{
      flex: 0.9,
      // width: '100%',
      width: '90%',
      //alignItems: 'center',
      marginBottom: 20,
      // alignItems: 'flex-start',
      justifyContent: 'flex-start',
    }}>
        <Text style={{fontSize: 20, marginBottom: 70}}>Update your delivery for your customer as you complete it!</Text>
        <View style={styles.status_single_update}>
          <Text style={styles.status_text}>I'm on my way to {customer.order.pickup_loc.name}</Text>
          <View style={styles.status_yes_button}>
            <Button
              title="Yes!" color={'green'}
              onPress={() => {
                track(`heading to ${customer.order.pickup_loc.name}`);
              }}
            ></Button>
          </View>
        </View>
        <View style={styles.status_single_update}>
          <Text style={styles.status_text}>I've picked up the food!</Text>
          <View style={styles.status_yes_button}>
            <Button
              title="Yes!" color={'green'}
              onPress={() => {
                track("picked up");
              }}
            ></Button>
          </View>
        </View>
        <View style={styles.status_single_update}>
          <Text style={styles.status_text}>I'm on my way to {customer.order.drop_loc.name} ?</Text>
          <View style={styles.status_yes_button}>
            <Button
              title="Yes!" color={'green'}
              onPress={() => {
                track(`heading to ${customer.order.drop_loc.name}`);
              }}
            ></Button>
          </View>
        </View>
        <View style={styles.status_single_update}>
          <Text style={styles.status_text}>I've arrived.</Text>
          <View style={styles.status_yes_button}>
            <Button
              title="Yes!" color={'green'}
              onPress={() => {
                track("arrived");
              }}
            ></Button>
          </View>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: 80}}>
        <Button
          title="Reset Status" color={'green'}
          onPress={() => {
            track("matched");
          }}
        ></Button>
      </View>
      <View style={{position: 'absolute', bottom: 50}}>
        <Button
          title="Food is delivered!" color={'green'}
          onPress={() => {
            track("delivered");
            props.navigation.navigate("Completed");
          }}
        ></Button>
      </View>
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
