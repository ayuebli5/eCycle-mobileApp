import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ChevronRightIcon, StarIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { useSelector } from "react-redux";
import { checkRedux } from "../features/checkSlice";

const DevicesColumn = ({
  id,
  imgUrl,
  title,
  genre,
  short_description,
  estimatedPoint,
}) => {
  const navigation = useNavigation();
  const checkReduxNow = useSelector(checkRedux);
  return (
    <TouchableOpacity
      onPress={() => {
        checkReduxNow == 0
          ? navigation.navigate("FillDeviceInfo", {
              id,
              imgUrl,
              title,
              genre,
              short_description,
              estimatedPoint,
            })
          : navigation.navigate("RepairFill", {
              id,
              imgUrl,
              title,
              genre,
              short_description,
              estimatedPoint,
            });
      }}
      className="flex-row bg-white rounded-xl my-2 ml-5 mr-5"
    >
      <View className="flex-row flex-1">
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="h-20 w-20 rounded-xl"
        />
        <View className="space-x-1 py-2 px-3">
          <Text className="font-bold text-lg">{title}</Text>
          <View className="flex-row space-x-1">
            <StarIcon color="green" opacity={0.5} size={22} />
            <Text className="text-green-500 pr-2">{estimatedPoint}</Text>
            <Text className="">{genre}</Text>
          </View>
        </View>
      </View>
      <View className="pt-7 pr-2">
        <ChevronRightIcon color="green" opacity={0.5} size={22} />
      </View>
    </TouchableOpacity>
  );
};

export default DevicesColumn;
