import React from 'react'
import { Image, View, Text, TouchableOpacity} from 'react-native'
import { static_deliveries } from './deliveries';

export default function FoodLocs({selectedFoodLoc, setSelectedFoodLoc}) {
    return (
        <View style={{ flexDirection: "row", justifyContent:"space-between"}}>
            <FoodLocButton 
                name="The Hop" 
                image={require('./../images/courtyard_cafe.jpeg')}
                selectedFoodLoc={selectedFoodLoc} 
                setSelectedFoodLoc={setSelectedFoodLoc} />
             <FoodLocButton 
                name="Collis" 
                image={require('./../images/collis_cafe_1.jpeg')}
                selectedFoodLoc={selectedFoodLoc} 
                setSelectedFoodLoc={setSelectedFoodLoc} />
            
        </View>
    );
}

const FoodLocButton = ({ name, image, selectedFoodLoc, setSelectedFoodLoc }) => (
    <View
        style={{
            margin: 15,
            marginTop: 50,
        }}
    >
        <TouchableOpacity 
            style={{
                backgroundColor: selectedFoodLoc === name ? "gray" : "white",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 15
            }}
            onPress={() => setSelectedFoodLoc(name)}>
            <FoodLoc image={image} name={name} selectedFoodLoc={selectedFoodLoc} />
        </TouchableOpacity> 
    </View>
    );

    const FoodLoc = ({ image, name, selectedFoodLoc }) => (
        <>
            <Image
                    source={image}
                style={{ 
                    width: 120, 
                    height: 100, 
                    margin: 5,
                    borderRadius: 15 }}
            />
         <Text style= {{ color: selectedFoodLoc === name ? "white" : "green", alignSelf:"center", fontSize: 20, fontWeight: "700" }}>{name}</Text>
        </>
    )