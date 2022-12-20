import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { ArrowLeftIcon, UserIcon } from "react-native-heroicons/outline";
import { ref, update } from "firebase/database";
import { db } from "../firebase.config";
import { selectCredential } from "../features/credentialSlice";
import { useSelector } from "react-redux";

const AddAddressScreen = () => {
  //redux
  const selectUserCredential = useSelector(selectCredential);

  const GOOGLE_API_KEY = "AIzaSyDSCjBjVpPdmgiW3Fk-nj6rFvizN66VErs";
  const navigation = useNavigation();
  const aspecRatio = 16 / 9;
  const latitudeDelta = 0.001;
  const longitudeDelta = latitudeDelta * aspecRatio;
  const initialPosition = {
    latitude: 24.5,
    longitude: 54.6,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  };
  const [origin, setOrigin] = useState("");
  const [details, setDetails] = useState({});
  const mapRef = useRef(null);
  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };
  const onPlaceSelected = (details) => {
    const position = {
      latitude: details?.geometry.location.lat || 24.5,
      longitude: details?.geometry.location.lng || 54.6,
    };
    setOrigin(position);
    moveTo(position);
    writeUserFirebase(
      selectUserCredential[0].userId,
      details.formatted_address,
      details.geometry.location.lat,
      details.geometry.location.lng
    );
  };

  // update user function firebase
  function writeUserFirebase(userId, place, lat, long) {
    update(ref(db, "users/" + userId + "/location"), {
      place: place,
      lat: lat,
      long: long,
    });
  }
  return (
    <View>
      <View className="relative">
        <View className="bg-[#7cc464] pt-12 flex-row pb-3 items-center space-x-2 px-4">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={{
                uri: "https://tunza.eco-generation.org/file/e-waste%20recycling%20logo.jpg",
              }}
              className="h-10 w-10 bg-gray-300 p-4 rounded-full"
            />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="font-bold text-white text-2xl mr-2">eCycle</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
            <UserIcon size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={navigation.goBack}
          className=" flex-row space-x-2 absolute bottom-56 z-50 left-5 p-2 bg-gray-500 rounded-full "
        >
          <ArrowLeftIcon size={25} color="#ffffff" />
          <Text className="text-white mx-1">Go back</Text>
        </TouchableOpacity>

        <MapView
          className="w-screen h-screen min-h-full"
          initialRegion={initialPosition}
          ref={mapRef}
        >
          {origin && <Marker coordinate={origin} />}
          {/* {destination && <Marker coordinate={destination} />} */}
        </MapView>
        <View style={styles.searchContainer}>
          <Text className="font-bold text-lg pb-2 px-2">Address: </Text>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder="Search Area... "
            fetchDetails
            onPress={(data, details) => {
              onPlaceSelected(details);
              setDetails(details);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
          />
        </View>
        {/* <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            navigation.navigate("UserProfile");
            console.log(details.formatted_address);
          }}
        >
          <Text className="text-white self-center text-lg">Confirm</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  // container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  // },
  // map: {
  //     width: Dimensions.get('window').width / 2,
  //     height: Dimensions.get('window').height / 2,
  // },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
    padding: 8,
    borderRadius: 8,
    left: 24,
    top: Constants.statusBarHeight * 5,
  },
  confirmButton: {
    position: "absolute",
    width: "90%",
    backgroundColor: "#7cc464",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
    padding: 12,
    borderRadius: 8,
    left: 24,
    top: Constants.statusBarHeight * 30,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});
