import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import client from "../sanity";
import PartnersRowCard from "./PartnersRowCard";

const PartnersRow = ({ id, title, description }) => {
  const [updateData, setUpdateData] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "partners" && rewardstype._ref == $id]{
      rewardstype->{
      rewardstype
    },
      _id,
      image,
      name,
      points,
    }
  `,
        { id }
      )
      .then((data) => {
        setUpdateData(data);
      });
  }, []);
  return (
    <View>
      <View className="border-t-2 border-gray-200	">
        <View className="flex-row items-center justify-between mt-4 px-4">
          <Text className="font-bold text-lg">{title}</Text>
          <ArrowRightIcon color="#00CCBB" />
        </View>
        <Text className="text-xs text-gray-500 px-4"> {description}</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showHorizontalScrollIndicator="false"
        className="pt-2"
      >
        {/* Upadates Cards */}
        {updateData.map((data) => (
          <PartnersRowCard
            key={data._id}
            id={data._id}
            title={data.name}
            imgUrl={data.image}
            date={data.points}
            // content={data.description}
            location={data.points}
            description={data.points}

            //   rewardstype
            // },
            //   _id,
            //   image,
            //   name,
            //   points,
          />
        ))}
        {/* <UpdatesRowCard
          id={123}
          imgUrl="https://www.veracityworld.com/wp-content/uploads/2017/08/sell-old-electronics.jpg"
          title="Alarming increase of e-waste"
          rating="12 / 23 / 2022"
          genre="Meeting"
          address="Abu Dhabi, UAE"
          short_description="This is short description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Open the app on your device, reveal the developer menu then tap on Debug JS Remotely.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          dishes={[]}
          long={20}
          lat={0}
        />
        <UpdatesRowCard
          id={123}
          imgUrl="https://www.worldfutureenergysummit.com/content/dam/sitebuilder/rxae/worldfutureenergysummit/2021/waste/EcoWASTE-Learn-1.jpg/_jcr_content/renditions/original.image_file.592.355.file/922963040/EcoWASTE-Learn-1.jpg"
          title="UAE conference discussion"
          rating="12 / 23 / 2022"
          genre="Meeting"
          address="Abu Dhabi, UAE"
          short_description="This is short description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Open the app on your device, reveal the developer menu then tap on Debug JS Remotely.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          dishes={[]}
          long={20}
          lat={0}
        />
        <UpdatesRowCard
          id={123}
          imgUrl="https://www.veracityworld.com/wp-content/uploads/2017/08/sell-old-electronics.jpg"
          title="Alarming increase of e-waste"
          rating="12 / 23 / 2022"
          genre="Meeting"
          address="Abu Dhabi, UAE"
          short_description="This is short description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Open the app on your device, reveal the developer menu then tap on Debug JS Remotely.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          dishes={[]}
          long={20}
          lat={0}
        /> */}
      </ScrollView>
    </View>
  );
};

export default PartnersRow;
