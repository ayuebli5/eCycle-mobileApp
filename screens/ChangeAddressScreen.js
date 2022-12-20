import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChangeAddressScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="absolute bottom-0 h-52 w-full flex-1 ">
      <View className="bg-gray-100 items-center rounded-t-3xl h-full pt-2">
        <Text className="bg-gray-500 text-center h-1 w-16 rounded-3xl"></Text>

        {/* Location */}
        <View className="w-full">
          <Text className="font-bold text-lg p-4">Your Location</Text>
          <View className="flex-row p-4 items-center bg-white">
            <View className="py-2 pr-4">
              <EvilIcons name="location" size={30} color="black" />
            </View>
            <Text className="flex-1">
              Please set your location where you want us to pick the electronic
              devices from
            </Text>
            <TouchableOpacity
              className="p-4"
              onPress={() => navigation.navigate("AddAddress")}
            >
              <Text className="text-[#7cc464]">Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChangeAddressScreen;
