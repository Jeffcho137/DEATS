import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { DEATS_SERVER_URL, ROUTE_SSO_LOGIN, ROUTE_SSO_LOGOUT } from '../utils/Constants';

const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      padding: 15,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  });

export default function SSOLogout ({ navigation }) {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <WebView 
                source={{ uri: `${DEATS_SERVER_URL}${ROUTE_SSO_LOGOUT}` }}
                startInLoadingState={true}
                onMessage={(event) => {
                    console.log("onMessage event:", event.nativeEvent, "onMessage data:", event.nativeEvent.data)
                }}
            />
            <View>
                <Button
                    title="SSOLogin"
                    onPress={() => {
                        navigation.navigate("SSOLogin");
                    }}
                />
            </View>
        </SafeAreaView>
    )
}