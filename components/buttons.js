import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

export const BackButton = ({navigation}) => (
    <TouchableOpacity style={{
        alignItems: "center",
        }}
        onPress={() => {navigation.goBack()}}
    >
        < Ionicons name="caret-back-circle-outline" size={26} style={{ 
            color: "white",
            marginRight: 10,
        }}/>
    </TouchableOpacity>
)