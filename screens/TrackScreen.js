import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase.config";
import { selectCredential } from "../features/credentialSlice";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const TrackScreen = () => {
  const navigation = useNavigation();

  const selectUserCredential = useSelector(selectCredential);

  return (
    <>
      <View className="bg-[#7cc464] flex-1">
        <SafeAreaView className="z-50">
          <View className="flex-row justify-between items-center p-5">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <XMarkIcon color="white" size={30} />
            </TouchableOpacity>
            <Text className="font-light text-white text-lg">Order Help</Text>
          </View>

          <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-lg text-gray-400">Estimate Arrival</Text>
                <Text className="text-4xl font-bold">2-3 Days</Text>
              </View>
              <Image
                source={{
                  uri: "https://media4.giphy.com/media/WxcbKjRFlLSPykH9gB/giphy.gif?cid=ecf05e47dvhakqyt6s4agq7g8gc0s057kyn1bqoo1xwhis13&rid=giphy.gif&ct=g",
                }}
                className="h-20 w-20"
              />
            </View>

            <Progress.Bar size={30} color="#7cc464" indeterminate={true} />

            <Text className="mt-3 text-gray-500">
              Your pick up request is under process
            </Text>
          </View>
        </SafeAreaView>

        <MapView
          initialRegion={{
            latitude: selectUserCredential[0].location.lat,
            longitude: selectUserCredential[0].location.long,
            latitudeDelta: 0.0455,
            longitudeDelta: 0.0455,
          }}
          className="flex-1 -mt-10 z-0"
          mapType="mutedStandard"
        >
          <Marker
            coordinate={{
              latitude: selectUserCredential[0].location.lat,
              longitude: selectUserCredential[0].location.long,
            }}
            title="Electronic Recyle"
            description="Recycling a used mobile phone"
            identifier="origin"
            pinColor="red"
          />
        </MapView>

        <SafeAreaView className="h-24">
          <View className="absolute bottom-12 bg-white flex-row items-center space-x-5 pb-2 pt-1 mb-1">
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG6Pq8hCQDr81IqPWZdp-2KDl28ghNrzlaFg&usqp=CAU",
              }}
              className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
            />
            <View className="flex-1 mr-6">
              <Text className="text-lg">Jonny Smith</Text>
              <Text className="text-gray-400 ">
                Your Rider will contact you before one day of the pick up
              </Text>
            </View>
            {/* <Text className="text-[#7cc464] text-lg mr-5 font-bold">Call</Text> */}
          </View>
        </SafeAreaView>
      </View>
      <Footer />
    </>
  );
};

export default TrackScreen;
