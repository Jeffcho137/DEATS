import React, { Component, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { selectId, selectPhoneNum } from "../redux/slices/userSlice";
import {
  selectDropLocation,
  selectPickupLocation,
  selectOrderId,
} from "../redux/slices/orderDeliverySlice";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
//import styles from '../style';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { DEATS_SERVER_URL, ROUTE_UPDATE_ORDER } from "../utils/Constants";

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginTop: "30%",
  },
  codeFieldRoot: {
    marginTop: "40%",
  },
  cell: {
    width: 60,
    height: 60,
    lineHeight: 50,
    fontSize: 30,
    borderWidth: 2,
    borderColor: "#006400",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

export function Order_code(props) {
  const CELL_COUNT = 4;

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [args, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const dispatch = useDispatch();
  const id = useSelector(selectId);
  const number = useSelector(selectPhoneNum);
  const dropLocation = useSelector(selectDropLocation);
  const pickupLocation = useSelector(selectPickupLocation);
  const order_id = useSelector(selectOrderId);

  const sendGETcode = () => {
    if (value.length != 4) {
      console.log("Please enter the code");
    } else {
      fetch(`${DEATS_SERVER_URL}${ROUTE_UPDATE_ORDER}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          order_id: order_id,
          pickup_loc: {
            x: pickupLocation.lat,
            y: pickupLocation.long,
          },
          pickup_loc_name: pickupLocation.name,
          drop_loc: {
            x: dropLocation.lat,
            y: dropLocation.long,
          },
          drop_loc_name: dropLocation.address,
          GET_code: value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.succeeded == true) {
            console.log("GET code sent to server", value);
            // dispatch() // no need to dispatch
            // navigation.navigate('OrderSearch') // navigate to Brian's update pages
          } else {
            console.log(data.msg);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Enter GET Code</Text>
      <CodeField
        ref={ref}
        {...args}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Button color="#006400" title="submit" onPress={sendGETcode}></Button>
    </View>
  );
  // <View style={styles.container}>
  //     <View style={styles.order_sel}>
  //         <Text style={styles.searching_text}>Please enter your 4-digit GET code</Text>
  //         <Text style={styles.searching_text}>CODE</Text>
  //     </View>
  //     <Button title="Confirm" onPress={() => props.navigation.navigate('Profile')}></Button>
  //     <StatusBar style="auto" />
  // </View>
}

// export class Order_codeC extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.order_sel}>
//                     <Text style={styles.searching_text}>Enter your four digit code after ordering on GET</Text>
//                     <Text style={styles.searching_text}>CODE</Text>

//                 </View>

//                 <Button title="Confirm" onPress={() => this.props.navigation.navigate('Profile')}></Button>

//                 <StatusBar style="auto" />
//             </View>
//         )
//     }
// }
