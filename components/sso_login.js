import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      padding: 15,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
  });

const INJECTED_JAVASCRIPT = `(function() {
  window.ReactNativeWebView.postMessage(JSON.stringify(ReactNativeWebView));
})();`;

export default function SSOLogin ({ navigation }) {
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
             <WebView source={{ uri: 'https://d-testline.herokuapp.com/sso_login' }}
             
             onShouldStartLoadWithRequest={(request) => { 
                console.log("onShouldStartLoadWithRequest:", request);
                return true
             }}
             startInLoadingState={true}
             injectedJavaScript={INJECTED_JAVASCRIPT}
             onMessage={(event) => {
               console.log("onMessage event:", event.nativeEvent.data, "this data:", event.nativeEvent.data)
             }}
             />
        </SafeAreaView>
    )
}