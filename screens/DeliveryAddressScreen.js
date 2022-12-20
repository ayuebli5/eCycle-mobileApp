import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MapPinIcon, UserIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";

const DeliveryAddressScreen = () => {
  const navigation = useNavigation();

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
        {/* Main */}
        <View className="h-[100%] items-center justify-center relative">
          <View className="flex items-center -translate-y-40 p-4">
            <MapPinIcon size={90} color="#d64c2d" />
            <Text className="text-black-500 font-bold text-xl mt-4">
              No delivery addresses
            </Text>
            <Text className="text-gray-500">No registered address found</Text>
          </View>
          <TouchableOpacity>
            <Text className="px-16 py-4 border-2 rounded-3xl">
              Add new address
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default DeliveryAddressScreen;
