import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronRightIcon,
  Cog6ToothIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Footer from "../components/Footer";

const ConfigureSettingsScreen = () => {
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
        <ScrollView>
          <View className="">
            <TouchableOpacity
              className="flex-row border-b items-center border-slate-400 p-4"
              onPress={() => navigation.navigate("ConfigureSettings")}
            >
              <Cog6ToothIcon size={30} color="#000000" />
              <View className="px-4 flex-1">
                <Text className="font-medium text-base">Night mode</Text>
                <Text className="text-slate-500">
                  Languages, search and nearby
                </Text>
              </View>
              <ChevronRightIcon size={20} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row border-b items-center border-slate-400 p-4"
              onPress={() => navigation.navigate("ConfigureSettings")}
            >
              <Cog6ToothIcon size={30} color="#000000" />
              <View className="px-4 flex-1">
                <Text className="font-medium text-base">Language</Text>
                <Text className="text-slate-500">
                  Languages, search and nearby
                </Text>
              </View>
              <ChevronRightIcon size={20} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row border-b items-center border-slate-400 p-4"
              onPress={() => navigation.navigate("ConfigureSettings")}
            >
              <Cog6ToothIcon size={30} color="#000000" />
              <View className="px-4 flex-1">
                <Text className="font-medium text-base">Brightness</Text>
                <Text className="text-slate-500">
                  Languages, search and nearby
                </Text>
              </View>
              <ChevronRightIcon size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Footer />
    </>
  );
};

export default ConfigureSettingsScreen;
