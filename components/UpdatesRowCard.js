import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";

const UpdatesRowCard = ({
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
      className="bg-white mr-3 h-76 w-80 shadow-md rounded-md border border-gray-300"
    >
      <View>
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="h-52 w-80 self-center"
        />
        <View className="ml-2">
          <View className="px-3">
            <Text className="font-bold text-lg pt-2">{title}</Text>
          </View>
          <View className="flex-row items-center space-x-1 px-3 pb-1">
            <CalendarDaysIcon color="green" opacity={0.5} size={22} />
            <Text className="text-xs text-gray-500">
              {date} . <Text className="font-bold text-sm">{description}</Text>
            </Text>
          </View>

          <View className="flex-row items-center space-x-1 px-3 mb-3">
            <MapPinIcon color="black" opacity={0.4} size={22} />
            <Text className="text-xs text-gray-500">{location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UpdatesRowCard;
