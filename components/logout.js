import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
      <LogoutButton navigation={navigation} />
    ),
})

const LogoutButton = ({navigation}) => (
    <TouchableOpacity style={{
        alignItems: "center",
        }}
        onPress={() => {navigation.navigate("SSOLogout")}}
    >
        < MaterialCommunityIcons name="logout" size={26} style={{ 
            color: "white",
            marginRight: 10,
        }}/>
    </TouchableOpacity>
)
