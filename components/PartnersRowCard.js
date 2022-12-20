import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";

const PartnersRowCard = ({
  id,
  imgUrl,
  title,
  description,
  date,
  location,
  content,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Updates", {
          id,
          imgUrl,
          title,
          description,
          date,
          location,
          content,
        });
      }}
      className=""
    >
      <View className="flex p-2 mx-1 my-2 rounded-lg shadow-sm shadow-slate-600	bg-white border border-gray-300">
        <View>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="h-36 w-40 rounded-xl"
          />
        </View>
        <View className="flex mt-2">
          <Text className="text-sm text-gray-500">{location} Points</Text>
          <Text className="font-medium text-lg">{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PartnersRowCard;
