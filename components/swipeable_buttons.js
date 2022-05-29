import React, { useRef } from 'react'
import { Alert, Animated, I18nManager, Text, View } from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { COLOR_LIGHT_BLUE, COLOR_PICKLE, DEATS_SERVER_URL, ROUTE_CANCEL_ORDER, ROUTE_UNMATCH } from '../utils/Constants';
import styles from '../style';
import { useSelector } from 'react-redux';
import { selectId } from '../redux/slices/userSlice';

let userId = null
let buttonRefs = []
let prevOpenedButton;

const swipeableButtonAlert = (text, cat, action, orderId) => {
  Alert.alert(
    "WAIT",
    `Are you sure you want to ${text} this ${cat}? \n You can't undo this action!`,
    [
      { 
        text: "YES",
        onPress: () => {
          action(orderId)
        }
      }, 
      { text: "NO"}
    ],
    { cancelable: true }
  );
}

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

export default function SwipeableButtons({ children, navigation, orderId, deliverer, cat, catModifier, buttonRef }) {
  buttonRef = useRef(null)

  
  userId = useSelector(selectId)

  const closePrevOpenedButton = () =>{
    if (prevOpenedButton && prevOpenedButton !== buttonRefs[orderId]) {
      prevOpenedButton.close();
    }
    prevOpenedButton = buttonRefs[orderId];
    console.log("buton", prevOpenedButton)
  }
  
  return (
    <Swipeable
      ref={ref => {
        buttonRefs[orderId] = ref
        buttonRef = ref
      }}
      friction={3}
      leftThreshold={50}
      rightThreshold={50}
      renderLeftActions={(dragX) => {
          return SwipeLeftButton(dragX, navigation)
      }}
      renderRightActions={(progress) => {
        if (catModifier === "Active") {
          return SwipeRightButtons(progress, navigation, orderId, deliverer, cat, buttonRef)
        }
      }}
      onSwipeableWillOpen={() => {
        closePrevOpenedButton()
      }}
    >
      {children}
    </Swipeable>
  )
}

const SwipeRightButton = ({ progress, translateX, text, color, navigation, orderId, buttonRef }) => {
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
          buttonRef.close()
          switch(text) {
            case "UPDATE \n STATUS":
              navigation.navigate("DeliverStatus")
              break

            case "UPDATE \n ORDER":
              navigation.navigate("OrderSelection")
              break
            
            case "UNMATCH":
              swipeableButtonAlert("unmatch", "deliverer", unmatchDeliverer, orderId)
              break

            case "CANCEL \n ORDER":
              swipeableButtonAlert("cancel", "order", cancelOrder, orderId)
              break

            default:
              swipeableButtonAlert("cancel", "delivery", unmatchDeliverer, orderId)
          }
        }}
      >
        <Text style={styles.swipeText}>{text}</Text>
      </RectButton>
    </Animated.View>
  )
}

const SwipeRightButtons = (progress, navigation, orderId, deliverer, cat, buttonRef) => (
    <View
      style={{
        width: "68%",
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}>
        <SwipeRightButton 
          progress={progress} 
          translateX={72} 
          text={cat === "Orders" ? "UPDATE \n ORDER" : "UPDATE \n STATUS"}
          color={COLOR_PICKLE} 
          navigation={navigation} 
          orderId={orderId}
          buttonRef={buttonRef}
        />

        {cat === "Orders" && deliverer &&
          <SwipeRightButton  
            progress={progress} 
            translateX={48} 
            text={"UNMATCH"} 
            color={COLOR_LIGHT_BLUE} 
            navigation={navigation}
            orderId={orderId}
            buttonRef={buttonRef}
          />
        }
      
        <SwipeRightButton 
          progress={progress} 
          translateX={24} 
          text={cat === "Orders" ? "CANCEL \n ORDER" : "CANCEL \n DELIVERY"} 
          color="brown"
          navigation={navigation}
          orderId={orderId}
          buttonRef={buttonRef}
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

