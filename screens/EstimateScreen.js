import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
  selectEstimateTotal,
} from "../features/basketSlice";
import { useState } from "react";

const EstimateScreen = () => {
  const navigation = useNavigation();
  const {
    params: { id, imgUrl, title, genre, amount, short_description },
  } = useRoute();

  //Redux
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket());
  };
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  const estimateTotal = useSelector(selectEstimateTotal);

  return (
    <View className="absolute bottom-0 h-72 w-full flex-1 ">
      <View className="bg-gray-100 rounded-t-3xl h-full">
        <View className="px-5 py-3 border-b border-[#7cc464] rounded-t-3xl shadow-xs">
          <View className="items-center">
            <Text className="bg-gray-500 justify-center h-1 w-16 mb-2 rounded-3xl"></Text>
            <Text className="text-2xl font-bold text-center">
              Estimated Price
            </Text>
            <Text className="text-center text-gray-400">Auto Computation</Text>
          </View>
          <TouchableOpacity
            onPressIn={removeItemFromBasket}
            onPress={navigation.goBack}
            className="rounded-full bg-gray-200 absolute top-3 right-5"
          >
            <XCircleIcon color="#7cc464" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className="items-center space-x-1 py-2 bg-white my-2">
          <Text className="text-2xl font-bold text-[#7cc464]">
            {estimateTotal} Points
          </Text>
          <Text className="items-center justify-center px-3 text-gray-400">
            Points can be converted to money, voucher, or gift cards
          </Text>
          <View className="flex-row">
            <Text className="items-center justify-center text-gray-400">
              For more info check your
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Wallet");
              }}
            >
              <Text className="text-[#7cc464]"> points page</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 py-3 bg-white space-y-4 h-full">
          <TouchableOpacity
            onPressIn={navigation.goBack}
            onPressOut={removeItemFromBasket}
            onPress={() => {
              navigation.navigate("ContinueToCart", {
                id,
                imgUrl,
                title,
                genre,
                amount,
                short_description,
                estimateTotal,
              });
            }}
            className="rounded-2xl bg-[#7cc464] p-4 mx-3 "
          >
            <Text className="text-center text-white text-lg font-bold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EstimateScreen;
