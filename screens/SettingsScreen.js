import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  ChevronRightIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  MapPinIcon,
  TrophyIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase.config.jsx";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addToCredential } from "../features/credentialSlice.js";
import Footer from "../components/Footer.js";

const SettingsScreen = () => {
  const navigation = useNavigation();

  //Firebase
  function signOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  // Empty user info Redux
  const dispatch = useDispatch();
  const addItemToCredential = (aa) => {
    dispatch(addToCredential(aa));
  };

  return (
    <>
      <View>
        {/* Header text with logo */}
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
        <View className="bg-white pb-5">
          <TouchableOpacity
            className="flex-row border-b items-center border-slate-400 p-4"
            onPress={() => navigation.navigate("UserProfile")}
          >
            <UserIcon size={30} color="#000000" />
            <View className="px-4 flex-1">
              <Text className="font-medium text-base">Personal details</Text>
              <Text className="text-slate-500">
                First name, last name, email address
              </Text>
            </View>
            <ChevronRightIcon size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row border-b items-center border-slate-400 p-4"
            onPress={() => navigation.navigate("AddAddress")}
          >
            <MapPinIcon size={30} color="#000000" />
            <View className="px-4 flex-1">
              <Text className="font-medium text-base">Delivery Addresses</Text>
              <Text className="text-slate-500">
                Add, edit and delete addresses
              </Text>
            </View>
            <ChevronRightIcon size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row border-b items-center border-slate-400 p-4"
            onPress={() => navigation.navigate("Rewards")}
          >
            <TrophyIcon size={30} color="#000000" />
            <View className="px-4 flex-1">
              <Text className="font-medium text-base">Rewards</Text>
              <Text className="text-slate-500">Manage your Rewards</Text>
            </View>
            <ChevronRightIcon size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row border-b items-center border-slate-400 p-4"
            onPress={() => navigation.navigate("Wallet")}
          >
            <CreditCardIcon size={30} color="#000000" />
            <View className="px-4 flex-1">
              <Text className="font-medium text-base">Wallet</Text>
              <Text className="text-slate-500">Manage wallet</Text>
            </View>
            <ChevronRightIcon size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row border-b items-center border-slate-400 p-4"
            onPress={() => navigation.navigate("ConfigureSettings")}
          >
            <Cog6ToothIcon size={30} color="#000000" />
            <View className="px-4 flex-1">
              <Text className="font-medium text-base">Settings</Text>
              <Text className="text-slate-500">
                Languages, search and nearby
              </Text>
            </View>
            <ChevronRightIcon size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              addItemToCredential([]);
              navigation.navigate("Login");
            }}
          >
            <Text className="text-red-600 text-xl font-semibold p-6">
              LOG OUT
            </Text>
          </TouchableOpacity>
          <View className="flex items-center">
            <Text className="underline">Terms of Service & Privacy</Text>
            <Text>1.0.0</Text>
          </View>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default SettingsScreen;
