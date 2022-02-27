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

// export class Map_test extends Component {
const Map_test = () => {
  //render() {
  const [pin, setPin] = React.useState({
    latitude: 43.704483237221815,
    longitude: -72.28869350196095,
  });

  const [region, setRegion] = React.useState({
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
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }}
        query={{
          key: "AIzaSyBwmbGUvhyMYbYowgyaf5TalrDdPUKYG3Y",
          language: "en",
          components: "country:us",
          radius: 300,
          location: `${region.latitude}, ${region.longitude}`,
          // types: establishment,
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
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 43.704483237221815,
          longitude: -72.28869350196095,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onPress={(e) => console.log(e.nativeEvent.coordinate)}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>Customer 1</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={100} />
      </MapView>

      {/* <Button
        title="Confirm"
        onPress={() => this.props.navigation.navigate("Profile")}
      ></Button>
      <Button
        title="Cancel"
        onPress={() => this.props.navigation.navigate("Home")}
      ></Button>

      <StatusBar style="auto" /> */}
    </View>
  );
  //}
};
export default Map_test;
