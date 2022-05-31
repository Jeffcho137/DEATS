import React, { useState, useRef, useEffect } from "react";
import { Text, View, Button } from "react-native";
import styles from "../style";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDropLocation } from "../redux/slices/orderDeliverySlice";

const Map_test = ({ navigation, route }) => {
  const [addressName, setAddressName] = useState({text: "Search"});
  const API_KEY = "AIzaSyAvcpVsefUlx1N2DGbCxWwsnReeZkpjUcA";
  const get_location = (lat, long, setPinDragged) => {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + lat + "," + long + "&key=" + API_KEY)
      .then((response) => response.json())
      .then((responseJson) => {
        const location_obj = JSON.parse(JSON.stringify(responseJson));
        if (location_obj && location_obj.results[0]) {
          setAddressName({text: location_obj.results[0].formatted_address});
          console.log('address', addressName.text)

        }
        console.log("Fetch", lat, long);
        setPinDragged(false);
      });
  };

  const [region, setRegion] = useState({
    latitude: 43.704483237221815,
    longitude: -72.28869350196095,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  let markerRef = useRef(null);
  const ref = useRef();

  const [calloutMounted, setCalloutMounted] = useState(false);
  const [pinDragged, setPinDragged] = useState(false);
  const [pinSelected, setPinSelected] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("callMounted:", calloutMounted);
    markerRef.current && calloutMounted && markerRef.current.redrawCallout();
  });

  useEffect(() => {
    get_location(region.latitude, region.longitude, setPinDragged);
    ref.current?.setAddressText(addressName.text);
  }, [pinDragged]);

  return (
    <View styles={{ marginTop: 50, flex: 1 }}>
      <GooglePlacesAutocomplete
        ref={ref}
        value={`${addressName.text}`}
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

          //location = details.name +"\n"+ details.formatted_address
          //address = details.formatted_address;
          setAddressName({text: details.formatted_address})
          console.log("loc", addressName.text);
        }}
        query={{
          key: API_KEY,
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
        onPress={(e) => {
          {
            setPinSelected(false);
            setCalloutMounted(false);
          }
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        region={region}
      >
        <Marker
          ref={markerRef}
          //tracksViewChanges={true}
          //tracksInfoWindowChanges={true}
          pinColor={pinSelected ? "blue" : "red"}
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
            setPinSelected(true);
          }}
          onDragEnd={(e) => {
            console.log("Drag end", e.nativeEvent.coordinate);
            setRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            setPinDragged(true);
            setPinSelected(false);

          }}
          stopPropagation={true}
          onPress={(e) => {
            setCalloutMounted(true);
            setPinSelected(false);
            console.log("Marker pressed", e.nativeEvent.coordinate);
          }}
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
        color={pinSelected ? "gray" : "blue"}
        onPress={() => {
          console.log("button location", addressName.text);
          console.log("latitude", region.latitude);
          console.log("longitude", region.longitude);

          if (route.params?.addressEdit) {
            navigation.navigate("OrderReview", {
              drop_loc: {
                coordinates: {
                  lat: region.latitude,
                  long: region.longitude,
                },
                name: addressName.text,
              },
            });
          } else {
            navigation.navigate("OrderSelection", { chosen: true });
            dispatch(
              setDropLocation({
                coordinates: {
                  lat: region.latitude,
                  long: region.longitude,
                },
                name: addressName.text,
              })
            );
          }
        }}
      ></Button>
    </View>
  );
};
export default Map_test;
