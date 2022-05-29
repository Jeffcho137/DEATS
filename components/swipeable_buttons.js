import React, { useRef } from 'react'
import { Alert, Animated, I18nManager, Text, View } from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { COLOR_LIGHT_BLUE, COLOR_PICKLE } from '../utils/Constants';
import styles from '../style';

let ref = null

export default function SwipeableButtons({ children }) {
  ref = useRef(null)

  return (
    <Swipeable
    ef={ref}
    friction={3}
    leftThreshold={50}
    rightThreshold={50}
    renderLeftActions={SwipeLeftButton}
    renderRightActions={SwipeRightButtons}
    >
      {children}
    </Swipeable>
  )
}

const SwipeRightButton = ({ progress, translateX, text, color }) => {
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
          Alert.alert('Button with background color ' + color + ' pressed');
        }}
      >
        <Text style={styles.swipeText}>{text}</Text>
      </RectButton>
    </Animated.View>
  )
}

const SwipeRightButtons = (progress) => (
    console.log("progress", progress),
    <View
      style={{
        width: "68%",
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}>
        <SwipeRightButton progress={progress} translateX={72} text={'UPDATE'} color={COLOR_PICKLE}  />
        <SwipeRightButton  progress={progress} translateX={48} text={'UNMATCH'} color={COLOR_LIGHT_BLUE}  />
        <SwipeRightButton progress={progress} translateX={24} text={"CANCEL"} color="brown"   />
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

