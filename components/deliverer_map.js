import React, { useEffect, useRef, useState } from "react";
import { Text, View, Button} from "react-native";
import styles from "../style";
import MapView from "react-native-maps";
import {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
} from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const API_KEY = 'AIzaSyCCkDRzY3UvSoaZa1anF9ov43ztpe6GSFk';
let start_location = '';
let fin_location = '';

const get_start_location = (lat, long, setStartPinDragged) => {
  // let address;
  fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + API_KEY)
  .then((response) => response.json())
  .then((responseJson) => {
      const location_obj = JSON.parse(JSON.stringify(responseJson))
      start_location = location_obj.results[0].formatted_address
      console.log('get start', start_location)
      setStartPinDragged(false);
})
}

const get_fin_location = (lat, long, setFinPinDragged) => {
    // let address;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + API_KEY)
    .then((response) => response.json())
    .then((responseJson) => {
        const location_obj = JSON.parse(JSON.stringify(responseJson))
        fin_location = location_obj.results[0].formatted_address
        console.log('get fin', fin_location)
        setFinPinDragged(false);
  })
  }

// export class Map_test extends Component {
const Del_map = (props) => {
  let startMarkerRef = useRef(null);
  let finMarkerRef = useRef(null);
  const [startCalloutMounted, setStartCalloutMounted] = useState(false);
  const [finCalloutMounted, setFinCalloutMounted] = useState(false);
  const [startPinDragged, setStartPinDragged] = useState(false);
  const [startPinSelected, setStartPinSelected] = useState(false);
  const [finPinDragged, setFinPinDragged] = useState(false);
  const [finPinSelected, setFinPinSelected] = useState(false);

  useEffect(() => {
    console.log("callMounted:", "start->", startCalloutMounted, "fin->", finCalloutMounted);
    startMarkerRef.current && startCalloutMounted && startMarkerRef.current.redrawCallout();
    finMarkerRef.current && finCalloutMounted && finMarkerRef.current.redrawCallout();
  });

  useEffect(() => {
    get_start_location(startRegion.latitude, startRegion.longitude, setStartPinDragged);
  }, [startPinDragged]);

  useEffect(() => {
    get_fin_location(finRegion.latitude, finRegion.longitude, setFinPinDragged);
  }, [finPinDragged]);

  const [startRegion, setStartRegion] = useState({
    latitude: 43.704483237221815,
    longitude: -72.28869350196095,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [finRegion, setFinRegion] = useState({
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
          setStartRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          start_location = details.name +"\n"+ details.formatted_address
          console.log("start_loc", start_location)
        }}

        query={{
          key: "AIzaSyCCkDRzY3UvSoaZa1anF9ov43ztpe6GSFk",
          language: "en",
          components: "country:us",
          radius: 300,
          location: `${startRegion.latitude}, ${startRegion.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
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
          console.log(data);
          console.log('-----')
          console.log(details)
          setFinRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          fin_location = details.name +"\n"+ details.formatted_address
          console.log("finloc", fin_location)

        console.log("search", fin_location)
        }}

        query={{
          key: "AIzaSyCCkDRzY3UvSoaZa1anF9ov43ztpe6GSFk",
          language: "en",
          components: "country:us",
          radius: 300,
          location: `${finRegion.latitude}, ${finRegion.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      />
      <MapView
        style={styles.del_map}
        provider={PROVIDER_GOOGLE}
        onPress={(e) => {
          setStartCalloutMounted(false);
          setFinCalloutMounted(false);
          setStartPinSelected(false);
          setFinPinSelected(false)}}
        initialRegion={{
          latitude: 43.704483237221815,
          longitude: -72.28869350196095,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          ref={startMarkerRef}
          pinColor={startPinSelected ? "blue" : "red"}
          coordinate={{
            latitude: startRegion.latitude,
            longitude: startRegion.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            setStartPinSelected(true);
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onPress={(e) => {
            setStartCalloutMounted(true);
            setStartPinSelected(false);
            console.log(e.nativeEvent.coordinate)}}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate);
            setStartRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            setStartPinDragged(true);
          }}
          stopPropagation={true}
        >
          <Callout>
            <Text>This is my current location: </Text>
            <Text>
              {startRegion.latitude}, {startRegion.longitude}
            </Text>
          </Callout>
        </Marker>
        <Marker
          ref={finMarkerRef}
          pinColor={finPinSelected ? "blue" : "red"}
          coordinate={{
            latitude: finRegion.latitude,
            longitude: finRegion.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            setFinPinSelected(true)
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onPress={(e) => {
            setFinCalloutMounted(true);
            setFinPinSelected(false)
            console.log(e.nativeEvent.coordinate)}}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate);
            setFinRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            setFinPinDragged(true);
          }}
          stopPropagation={true}
        >
          <Callout>
            <Text>This is my final destination after drop-off:</Text>
            <Text>
              {finRegion.latitude}, {finRegion.longitude}
            </Text>
          </Callout>
        </Marker>
      </MapView>

      <Button
        title="Confirm"
        color={startPinSelected || finPinSelected? "gray" : "blue"}
        onPress={() => props.navigation.navigate("DeliverySelection",{
          chosen: true,
          start_lat: startRegion.latitude,
          start_long: startRegion.longitude,
          address1: start_location,
          fin_lat: finRegion.latitude,
          fin_long: finRegion.longitude,
          address2: fin_location,
        })}
      ></Button>
    </View>
  );
  //}
};
export default Del_map;