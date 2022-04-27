import React from "react";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput, useWindowDimensions } from "react-native";
import { useState } from "react";
import styles from "../style";
import Logo from "./image.js";
import { useDispatch } from "react-redux";
import { setEmail, setId, setName, setPhoneNum } from "../redux/slices/userSlice";
import { DEATS_SERVER_URL, ROUTE_LOGIN, ROUTE_SSO_LOGIN } from "../utils/Constants";
import RenderHtml from "react-native-render-html";
import { WebView } from "react-native-webview";

export function Landing({ navigation }) {
  const dispatch = useDispatch();

  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);
  const [page, setPage] = useState(false);
  const [ssoHTML, setHTML] = useState({
    html: "",
  });
  const { width } = useWindowDimensions();

  const sendLogin = () => {
    fetch(`${DEATS_SERVER_URL}${ROUTE_LOGIN}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: typedEmail,
        password: typedPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("login status:", data.succeeded);
        if (data.succeeded == true) {
          console.log("login results:", data);
          dispatch(setId(data.id));
          dispatch(setEmail(data.email));
          dispatch(setName(data.name));
          dispatch(setPhoneNum(data.phoneNum));

          navigation.navigate("Home");
        } else {
          console.log(data.msg);
          setSuccess(false);
          setMessage(data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const renderErrorMessage = () => {
    if (success) {
      return;
    } else {
      return <Text style={styles.unsuccessful_login}>{message}</Text>;
    }
  };

  const tryParseJSONObject = (jsonString) => {
    try {
      var o = JSON.parse(jsonString);
      if (o && typeof o === "object") {
        return o;
      }
    } catch (e) {}
    // console.log("ret false");
    return false;
  };

  const SSO_login = () => {
    fetch(`${DEATS_SERVER_URL}${ROUTE_SSO_LOGIN}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.text;
      })
      .then((data) => {
        setHTML({ html: data });
        // setPage(true);
        navigation.navigate("SSO");
        // console.log("login status:", data.succeeded);
        // if (data.succeeded == true) {
        //     console.log("login results:", data);
        //     dispatch(setId(data.id))
        //     dispatch(setEmail(data.email))
        //     dispatch(setName(data.name))
        //     dispatch(setPhoneNum(data.phoneNum))
        //     navigation.navigate('Home')
        // } else {
        //     console.log(data.msg);
        //     setSuccess(false)
        //     setMessage(data.msg)
        // }
      })
      .catch((err) => console.log(err));
  };

  // if (!page) {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.login_info}>
        <TextInput
          style={styles.login_input}
          placeholder="email"
          onChangeText={(text) => setTypedEmail(text)}
        ></TextInput>
        <TextInput
          style={styles.login_input}
          placeholder="password"
          onChangeText={(text) => setTypedPassword(text)}
        ></TextInput>
      </View>

      <View style={styles.landing_buttons}>
        <View style={styles.login_button}>
          <Button color="#006400" title="Dartmouth SSO" onPress={SSO_login}></Button>
        </View>
        <View style={styles.login_button}>
          <Button color="#006400" title="Sign-in" onPress={sendLogin}></Button>
        </View>
        {renderErrorMessage()}
        <View style={styles.create_acc_button}>
          <Button
            color="#006400"
            style={styles.create_acc_button}
            title="Sign-up"
            onPress={() => navigation.navigate("Signup")}
          ></Button>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
  // } else {
  //   return (
  //     <WebView
  //       source={{ uri: "https://deats-server.herokuapp.com/sso_login/" }}
  //       onMessage={(event) => console.log("On Message", event.nativeEvent.data)}
  //     />
  //   );
  // }
}
