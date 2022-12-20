import { View, Text, ScrollView } from "react-native";
import React from "react";
import ContributorCard from "./ContributorCard";
import { ArrowRightIcon } from "react-native-heroicons/solid";

const Contributor = () => {
  return (
    <View>
      <View className="flex-row items-center justify-between px-4">
        <Text className="font-medium text-lg">Top Contributors</Text>
        <ArrowRightIcon color="#5cab44" />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* Category Card */}
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          title="Natnael"
          points="1100"
        />
        <ContributorCard
          imgUrl="https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/person-man.png"
          title="Aymen"
          points="1080"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
          title="Antony"
          points="1010"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          title="Senay"
          points="950"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
          title="George"
          points="940"
        />
        <ContributorCard
          imgUrl="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/delivery_man.png"
          title="Ahmed"
          points="915"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/506/506185.png"
          title="Ali"
          points="880"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/180/180658.png"
          title="Robiel"
          points="865"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/560/560216.png"
          title="Max"
          points="844"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          title="Natnael"
          points="830"
        />
        <ContributorCard
          imgUrl="https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/person-man.png"
          title="Aymen"
          points="810"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
          title="Antony"
          points="436"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          title="Senay"
          points="400"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
          title="George"
          points="385"
        />
        <ContributorCard
          imgUrl="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/delivery_man.png"
          title="Ahmed"
          points="382"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/506/506185.png"
          title="Ali"
          points="355"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/180/180658.png"
          title="Robiel"
          points="348"
        />
        <ContributorCard
          imgUrl="https://cdn-icons-png.flaticon.com/512/560/560216.png"
          title="Max"
          points="330"
        />
      </ScrollView>
    </View>
  );
};

export default Contributor;
