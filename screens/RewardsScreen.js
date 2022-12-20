import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  GiftTopIcon,
  MapPinIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { GiftIcon } from "react-native-heroicons/outline";
import client from "../sanity";
import UpdatesRow from "../components/UpdatesRow";
import PartnersRow from "../components/PartnersRow";
import { useSelector } from "react-redux";
import { selectHistoryPointsTotal } from "../features/historySlice";
import { selectCredential } from "../features/credentialSlice";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase.config";
import Footer from "../components/Footer";

const RewardsScreen = () => {
  const navigation = useNavigation();

  const [rewardstype, setRewardstype] = useState([]);

  const [pointsFromFirebase, setPointsFromFirebase] = useState(0);

  //redux
  const selectUserCredential = useSelector(selectCredential);
  // read firebase
  function readCredentialFirebase(userId) {
    const starCountRef = ref(db, "users/" + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setPointsFromFirebase(data.totalHistoryPoints);
    });
  }

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "rewardstype"]{
      rewardstype,
      _id,
      description
    }
  `
      )
      .then((data) => {
        setRewardstype(data);
        readCredentialFirebase(selectUserCredential[0].userId);
      });
  }, []);

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
        <View className="">
          <ScrollView className="mb-60">
            <View className="bg-white py-1 border border-gray-300 rounded-2xl mx-2 mt-1">
              <View className="p-3 flex-row items-center justify-center space-x-2 rounded-2xl">
                <View className="bg-gray-100 rounded-full mr-3 p-3">
                  <GiftIcon size={70} color="#7cc464" />
                </View>
                <View>
                  <Text className="font-bold text-3xl">
                    {pointsFromFirebase} points!
                  </Text>
                  <Text className="text-base text-orange-600">
                    How it works?
                  </Text>
                </View>
              </View>
            </View>
            <View className="py-4 px-8 bg-white border border-gray-300 flex-row rounded-2xl mx-2 mt-1">
              <View>
                <Text className="font-semibold text-lg">
                  {pointsFromFirebase} Points
                </Text>
                <Text> My Points earned</Text>
              </View>
              <View className="ml-20 items-center self-center">
                <TouchableOpacity
                  onPress={() => [navigation.navigate("Cart")]}
                  className="bg-green-200 rounded-lg px-4 py-2"
                >
                  <Text className="text-lg">View history</Text>
                </TouchableOpacity>
              </View>
            </View>
            {rewardstype.map((data) => (
              <PartnersRow
                key={data._id}
                id={data._id}
                title={data.rewardstype}
                description={data.description}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default RewardsScreen;
