import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { setEmail, setId, setName, setPhoneNum } from '../redux/slices/userSlice';

const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      padding: 15,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  });

const validateST = (ticketedURL, dispatch, navigation) => {
    fetch(ticketedURL,
    {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } 
    })
    .then(response => response.json())
    .then((data) => {
        console.log("server response:", data)
        if (data.succeeded == true) {
            dispatch(setId(data.user.user_id))
            dispatch(setEmail(data.user.user_info.email))
            dispatch(setName(data.user.user_info.name))
            dispatch(setPhoneNum(data.user.user_info.phone_num))
            
            navigation.navigate("Home");
        } else {
            console.log(data.msg);
        }
    })
    .catch((error) => console.log("error:", error));
}

export default function SSOLogin ({ navigation }) {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <WebView 
                source={{ uri: "https://d-testline.herokuapp.com/sso_login" }}
                onShouldStartLoadWithRequest={(request) => { 
                    console.log("onShouldStartLoadWithRequest:", request);

                    if (request.url.includes("?ticket")) {
                        console.log("ST url:", request.url)
                        validateST(request.url, dispatch, navigation);
                    }

                    else {
                        return true // continue loaading if service ticket is not included in the url
                    }
                }}
                startInLoadingState={true}
                onMessage={(event) => {
                    console.log("onMessage event:", event.nativeEvent, "onMessage data:", event.nativeEvent.data)
                }}
            />
        </SafeAreaView>
    )
}