import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MapPinIcon, XCircleIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  selectCartItems,
  selectCartPointsTotal,
} from "../features/cartSlice";
import { addToHistory, selectHistoryItems } from "../features/historySlice";
import { urlFor } from "../sanity";
import { child, onValue, push, ref, remove, set } from "firebase/database";
import { db } from "../firebase.config.jsx";
import { selectCredential } from "../features/credentialSlice";
import Footer from "../components/Footer";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const {
    params: { place },
  } = useRoute();

  // Redux
  const items = useSelector(selectCartItems);
  const cartPointsTotal = useSelector(selectCartPointsTotal);
  const dispatch = useDispatch();
  const selectUserCredential = useSelector(selectCredential);

  // Redux and firebase add history
  const addItemToHistory = () => {
    if (!items.length > 0) return;
    items.map((item) => dispatch(addToHistory(item)));
    items.map((item) =>
      writeHistoryFirebase(
        selectUserCredential[0].userId,
        item.id,
        item.imgUrl,
        item.title,
        item.genre,
        item.amount,
        item.short_description,
        item.estimateTotal
      )
    );
  };

  // function write history firebase
  function writeHistoryFirebase(
    userId,
    itemId,
    imgUrl,
    title,
    genre,
    amount,
    short_description,
    estimateTotal
  ) {
    const newKey = push(child(ref(db), "history/" + userId)).key;
    set(ref(db, "history/" + userId + "/" + newKey), {
      userId: userId,
      itemId: itemId,
      imgUrl: imgUrl,
      title: title,
      genre: genre,
      amount: amount,
      short_description: short_description,
      estimateTotal: estimateTotal,
    });
  }
  const [pointsFromFirebase, setPointsFromFirebase] = useState(0);

  // read function firebase and set points
  function readCredentialFirebase(userId) {
    const starCountRef = ref(db, "users/" + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setPointsFromFirebase(data.totalHistoryPoints);
    });
  }

  // function delete cart, read credential,
  function deleteCartFirebase() {
    remove(ref(db, "cart/" + selectUserCredential[0].userId));
    readCredentialFirebase(selectUserCredential[0].userId);
  }

  return (
    <>
      <View className="flex-1 bg-white ">
        <View className="flex-1 bg-gray-100">
          <View className="p-5 border-b border-[#7cc464] bg-white shadow-xs">
            <View>
              <Text className="text-lg font-bold text-center">Basket</Text>
              <Text className="text-center text-gray-400">
                Details and Payment
              </Text>
            </View>
            <TouchableOpacity
              onPress={navigation.goBack}
              className="rounded-full bg-gray-100 absolute top-3 right-5"
            >
              <XCircleIcon color="#7cc464" height={50} width={50} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center space-x-1 px-4 py-3 bg-white my-5">
            <MapPinIcon color="black" opacity={0.4} size={36} />
            <Text className="flex-1">
              Address: {selectUserCredential[0].location.place}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddAddress");
              }}
            >
              <Text className="text-[#7cc464]"> Change</Text>
            </TouchableOpacity>
          </View>
          <ScrollView className="divide-y divide-gray-200">
            {Object.entries(items).map(([key, item]) => (
              <View
                key={key}
                className="flex-row items-center space-x-3 bg-white py-2 px-5"
              >
                <Text className="text-[#7cc464]">{item.amount} x</Text>
                <Image
                  source={{
                    uri: urlFor(item.imgUrl).url(),
                  }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">{item.title}</Text>
                <Text className="text-gray-600">
                  {item.estimateTotal} points
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart({ id: item.id }))}
                >
                  <Text className="text-[#7cc464] text-xs">Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View className="p-5 bottom-10 bg-white mt-5 space-y-4">
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-gray-400">{cartPointsTotal} points</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-400">Extra Points</Text>
              <Text className="text-gray-400">0 points</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="">Order Total</Text>
              <Text className="font-extrabold">{cartPointsTotal} points</Text>
            </View>
            <TouchableOpacity
              onPressIn={deleteCartFirebase}
              onPress={() =>
                navigation.navigate("PreparingOrder", { pointsFromFirebase })
              }
              onPressOut={addItemToHistory}
              className="rounded-lg bg-[#7cc464] p-4"
            >
              <Text className="text-center text-white text-lg font-bold">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default CheckoutScreen;
