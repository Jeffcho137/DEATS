import React, { Component, useState } from "react";
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
let start_location = '';
let fin_location = '';

const get_start_location = (lat, long) => {
  // let address;
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + API_KEY)
  .then((response) => response.json())
  .then((responseJson) => {
      //console.log('Location: ' + JSON.stringify(responseJson));
      const location_obj = JSON.parse(JSON.stringify(responseJson))
      // const address = location_obj.results[0].formatted_address
      start_location = location_obj.results[0].formatted_address
})
}

const get_fin_location = (lat, long) => {
    // let address;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + API_KEY)
    .then((response) => response.json())
    .then((responseJson) => {
        //console.log('Location: ' + JSON.stringify(responseJson));
        const location_obj = JSON.parse(JSON.stringify(responseJson))
        // const address = location_obj.results[0].formatted_address
        fin_location = location_obj.results[0].formatted_address
        console.log('get fin', fin_location)
  })
  }

// export class Map_test extends Component {
const Del_map = (props) => {
  //render() {
  const [startPin, setstartPin] = React.useState({
    latitude: 43.704483237221815,
    longitude: -72.28869350196095,
  });

  const [finPin, setfinPin] = React.useState({
    latitude: 43.704483237221815,
    longitude: -72.28869350196095,
  });

  const [startRegion, setstartRegion] = React.useState({
    latitude: 43.704483237221815,
    longitude: -72.28869350196095,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [finRegion, setfinRegion] = React.useState({
    latitude: 43.704483237221815,
    longitude: -72.28869350196095,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

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
          //console.log(data, details);
          setstartRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          start_location = details.name +"\n"+ details.formatted_address
          console.log("start_loc", start_location)
        //   get_start_location(startPin.latitude, startPin.longitude);
        //   console.log("search", start_location);

        //   setstartPin({
        //     latitude: details.geometry.location.lat,
        //     longitude: details.geometry.location.lng,
        //   })

        }}

        query={{
          key: "AIzaSyCCkDRzY3UvSoaZa1anF9ov43ztpe6GSFk",
          language: "en",
          components: "country:us",
          radius: 300,
          location: `${startRegion.latitude}, ${startRegion.longitude}`,
          // types: establishment,
        }}
        styles={{
          container: {
            flex: 0,
            // position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      />
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data);
          console.log('-----')
          console.log(details)
          setfinRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            
          });
          fin_location = details.name +"\n"+ details.formatted_address
          console.log("finloc", fin_location)

        //   setfinPin({
        //     latitude: data.nativeEvent.coordinate.latitude,
        //     longitude: data.nativeEvent.coordinate.longitude,
        //     // latitude: details.geometry.location.lat,
        //     // longitude: details.geometry.location.lng,
        //   })
          //get_fin_location(finPin.latitude, finPin.longitude);
        //   get_fin;_location(finRegion.latitude, finRegion.longitude);


        console.log("search", fin_location)


        }}

        query={{
          key: "AIzaSyCCkDRzY3UvSoaZa1anF9ov43ztpe6GSFk",
          language: "en",
          components: "country:us",
          radius: 300,
          location: `${finRegion.latitude}, ${finRegion.longitude}`,
          // types: establishment,
        }}
        styles={{
          container: {
            flex: 0,
            // position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 43.704483237221815,
          longitude: -72.28869350196095,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        // region={startRegion}
      >
        {/* <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        /> */}
        <Marker
          coordinate={startPin}
          coordinate={{
            latitude: startRegion.latitude,
            longitude: startRegion.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onPress={(e) => console.log(e.nativeEvent.coordinate)}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate);
            setstartPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });

            get_start_location(startPin.latitude, startPin.longitude);
          }}
        >
          <Callout>
            <Text>This is my current location: </Text>
            <Text>
              {startRegion.latitude}, {startRegion.longitude}
            </Text>
          </Callout>
        </Marker>
        <Marker
            style={{backgroundColor: 'blue'}}
          coordinate={finPin}
          coordinate={{
            latitude: finRegion.latitude,
            longitude: finRegion.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onPress={(e) => console.log(e.nativeEvent.coordinate)}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate);
            setfinPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });

            get_fin_location(finPin.latitude, finPin.longitude);
          }}
        >
          <Callout>
            <Text>This is my final destination after drop-off:</Text>
            <Text>
              {finRegion.latitude}, {finRegion.longitude}
            </Text>
          </Callout>
        </Marker>
        {/* <Circle center={startPin} radius={100} /> */}
      </MapView>

      <Button
        // styles={{ flex: 1 }}
        title="Confirm"
        onPress={() => props.navigation.navigate("DeliverySelection",{
          chosen: true,
          start_lat: startPin.latitude,
          start_long: startPin.longitude,
          address1: start_location,
          fin_lat: finPin.latitude,
          fin_long: finPin.longitude,
          address2: fin_location,
        })}
      ></Button>
      {/* <Button
        title="Cancel"
        onPress={() => this.props.navigation.navigate("Home")}
      ></Button>
      <StatusBar style="auto" /> */}
    </View>
  );
  //}
};
export default Del_map;