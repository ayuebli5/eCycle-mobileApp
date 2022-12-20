import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const ContributorCard = ({ imgUrl, title, points }) => {
  return (
    <TouchableOpacity className="items-center mr-2">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-12 w-12 bg-white rounded-full"
      />
      <Text className="bottom-1 mt-1 text-xs">{title}</Text>
      <Text className="bottom-1 text-xs text-[#73c45b]">{points}</Text>
    </TouchableOpacity>
  );
};

export default ContributorCard;
