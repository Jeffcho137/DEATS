import { Button } from "react-native";

const DEATSLogout = (logoutURL) => {
    fetch(logoutURL,
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
            navigation.navigate("Signup");
        } else {
            console.log(data.msg);
        }
    })
    .catch((error) => console.log("error:", error));
}

export default logout = ({  navigation }) => ({
    headerRight: () => (
      <Button
        title="Logout"
        onPress={() => {
            navigation.navigate("SSOLogout");
        }}
        color="#fff"
      />
    ),
})
