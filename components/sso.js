import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { WebView } from "react-native-webview";
import { DEATS_SERVER_URL, ROUTE_LOGIN, ROUTE_SSO_LOGIN } from "../utils/Constants";

export default function SSO({ navigation }) {
  return <WebView source={{ uri: "https://deats-server.herokuapp.com/sso_login/" }} />;
}
