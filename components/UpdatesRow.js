import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import UpdatesRowCard from "./UpdatesRowCard";

import client from "../sanity";

const UpdatesRow = ({ id, title, description }) => {
  const [updateData, setUpdateData] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "updates" && newstype._ref == $id]
  `,
        { id }
      )
      .then((data) => {
        setUpdateData(data);
      });
  }, []);
  return (
    <View className="mb-8">
      <View className="flex-row items-center justify-between mt-4 px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#7cc464" />
      </View>
      <Text className="text-xs text-gray-500 px-4"> {description} </Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showHorizontalScrollIndicator="false"
        className="pt-4"
      >
        {/* Upadates Cards */}
        {updateData.map((data) => (
          <UpdatesRowCard
            key={data._id}
            id={data._id}
            title={data.headline}
            imgUrl={data.image}
            date={data.date}
            content={data.description}
            location={data.location}
            description={data.type}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default UpdatesRow;
