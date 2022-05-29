import React, { useRef } from 'react'
import { Alert, Animated, I18nManager, Text, View, useNavigation } from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { COLOR_LIGHT_BLUE, COLOR_PICKLE, DEATS_SERVER_URL, ROUTE_CANCEL_ORDER, ROUTE_UNMATCH } from '../utils/Constants';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectId } from '../redux/slices/userSlice';

let ref = null
let userId = null

const unmatchDeliverer = (orderId) => {
  console.log("unmatch:", orderId)
  fetch(`${DEATS_SERVER_URL}${ROUTE_UNMATCH}`,
  {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user_id: userId,
          order_id: orderId,
      })
  })
  .then(response => response.json())
  .then((data) => {
      console.log(data)
  })
  .catch(err => console.error(err));
}

const cancelOrder = (orderId) => {
  console.log("cancel:", orderId)
  fetch(`${DEATS_SERVER_URL}${ROUTE_CANCEL_ORDER}`,
  {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user_id: userId,
          order_id: orderId,
          reason: ""
      })
  })
  .then(response => response.json())
  .then((data) => {
      console.log(data)
  })
  .catch(err => console.error(err));
}

export default function SwipeableButtons({ children, navigation, orderId }) {
  console.log("orderId", orderId)
  ref = useRef(null)
  userId = useSelector(selectId)
  
  return (
    <Swipeable
      ref={ref}
      friction={3}
      leftThreshold={50}
      rightThreshold={50}
      renderLeftActions={(dragX) => {
          return SwipeLeftButton(dragX, navigation)
        }
      }
      renderRightActions={(progress) => {
          return SwipeRightButtons(progress, navigation, orderId)
        }
      }
    >
      {children}
    </Swipeable>
  )
}

const SwipeRightButton = ({ progress, translateX, text, color, navigation, orderId}) => {
  return (
    <Animated.View style={{ 
      flex: 1, 
      transform: [{ 
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [translateX, 0],
        })
      }] 
    }}>

      <RectButton
        style={[styles.swipeRightButton, { backgroundColor: color }]}
        onPress={()  => {
          ref?.current?.close()
          if (text === "UPDATE") {
            navigation.navigate("OrderSelection")
          } else if (text === "UNMATCH") {
            unmatchDeliverer(orderId)
          } else if (text === "CANCEL") {
            console.log("cancel:", orderId)
            cancelOrder(orderId)
          } else{
            Alert.alert(
              "WAIT",
              `Are you sure you want to ${text} this order?`,
              [{ text: "WHY NOT" }, { text: "OOF" }],
              { cancelable: false }
            );
          }
        }}
      >
        <Text style={styles.swipeText}>{text}</Text>
      </RectButton>
    </Animated.View>
  )
}

const SwipeRightButtons = (progress, navigation, orderId) => (
    console.log("progress", progress),
    <View
      style={{
        width: "68%",
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}>
        <SwipeRightButton 
          progress={progress} 
          translateX={72} 
          text={'UPDATE'} 
          color={COLOR_PICKLE} 
          navigation={navigation} 
          orderId={orderId}
        />
        <SwipeRightButton  
          progress={progress} 
          translateX={48} 
          text={'UNMATCH'} 
          color={COLOR_LIGHT_BLUE} 
          navigation={navigation}
          orderId={orderId}
        />
          
        <SwipeRightButton 
          progress={progress} 
          translateX={24} 
          text={"CANCEL"} 
          color="brown"
          navigation={navigation}
          orderId={orderId}
        />
    </View>
  );


const SwipeLeftButton = (dragX) => {
    return (
      <RectButton style={styles.swipeLeftButton} >
        <Animated.Text
          style={[
            styles.swipeText,
            {
              transform: [{ 
                translateX: dragX.interpolate({
                  inputRange: [25, 50, 100, 200],
                  outputRange: [-8, 1, 2, 3],
                  extrapolate: 'clamp',
                }) 
              }],
            },
          ]}>
          DELETE
        </Animated.Text>
      </RectButton>
    );
  };

