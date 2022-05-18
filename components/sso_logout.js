import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

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
                source={{ uri: "https://d-testline.herokuapp.com/sso_logout" }}
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