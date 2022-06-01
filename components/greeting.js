import { Text, View } from "react-native"

export default Greeting = ({ name, username }) => {
    const date = new Date()
    const hours = date.getHours()
    let greeting = null

    if (hours < 12) {
        greeting = "Good morning😀"
    }

    else if (hours < 18) {
        greeting = `Good afternoon🤗`
    }

    else {
        greeting = "Good evening😇"
    }

    return (
        <View style={{
            padding: 15,
            alignItems: 'center',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'green',
            height: "80%",
        }}
        >
            <Text 
            style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: "green"
            }}
            >{greeting},</Text>
            <Text 
            style={{
                fontWeight: 'bold',
                fontSize: 20,
            }}
            >{name.split(" ")[0]} </Text>
            <Text 
            style={{
                fontWeight: 'bold',
                fontSize: 18,
            }}
            >({username}) </Text>
        </View>
    )
}