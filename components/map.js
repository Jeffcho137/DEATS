import React, { Component, useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput, Dimensions } from "react-native";
import styles from "../style";
import MapView from "react-native-maps";
import {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  nativeEvent,
  Circle,
} from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { region } from "caniuse-lite";

const API_KEY = 'AIzaSyCCkDRzY3UvSoaZa1anF9ov43ztpe6GSFk';
let location = '';

const get_location = (lat, long) => {
  // let address;
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + API_KEY)
  .then((response) => response.json())
  .then((responseJson) => {
      //console.log('Location: ' + JSON.stringify(responseJson));
      const location_obj = JSON.parse(JSON.stringify(responseJson))
      // const address = location_obj.results[0].formatted_address
      location = location_obj.results[0].formatted_address
      console.log("Fetch", lat, long)
      console.log("Fetch:", location)
      
})
}

// export class Map_test extends Component {
const Map_test = (props) => {
  const [region, setRegion] = React.useState({
    latitude: 43.704483237221815,
    longitude: -72.28869350196095,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  let markerRef = useRef(null);
  const [calloutMounted, setCalloutMounted] = useState(false);
  const [pinColor, setPinColor] = useState("red");
  const [btnColor, setBtnColor] = useState("blue");

  useEffect(() => {
    console.log("callMounted:", calloutMounted);
    markerRef.current && calloutMounted && markerRef.current.redrawCallout();
  });

  useEffect(() => {
    get_location(region.latitude, region.longitude);
  }, [region]);

  return (
    <View styles={{ marginTop: 50, flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          location = details.name +"\n"+ details.formatted_address
          console.log("loc", location)

        }}

        query={{
          key: "AIzaSyCCkDRzY3UvSoaZa1anF9ov43ztpe6GSFk",
          language: "en",
          components: "country:us",
          radius: 300,
          location: `${region.latitude}, ${region.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      />
      <MapView
        style={styles.map}
        onPress={(e) => {{
          setPinColor("red");
          setBtnColor("blue");
          setCalloutMounted(false)}}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 43.704483237221815,
          longitude: -72.28869350196095,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={region}
      >
        <Marker
          ref={markerRef}
          //tracksViewChanges={true}
          //tracksInfoWindowChanges={true}
          pinColor={pinColor}
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
            setPinColor("blue");
            setBtnColor("gray");
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate);
            setRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }}
          stopPropagation={true}
          onPress={(e) => {
            setCalloutMounted(true)
            console.log("Marker pressed", e.nativeEvent.coordinate)}}
        >
          <Callout>
            <Text>This is my location: </Text>
            <Text>
              {region.latitude}, {region.longitude}
            </Text>
          </Callout>
        </Marker>
      </MapView>

      <Button
        title="Confirm"
        color={btnColor}
        onPress={() => 
          {console.log("button location", location)
          console.log("lattitude", region.latitude)
          console.log("longitude", region.longitude)
          props.navigation.navigate("OrderSelection",{
          chosen: true,
          lat: region.latitude,
          long: region.longitude,
          address: location,
        })}}
      ></Button>
    </View>
  );
};
export default Map_test;