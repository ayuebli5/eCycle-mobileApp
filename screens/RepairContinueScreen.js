import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { ShoppingCartIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../features/cartSlice";
import { useEffect, useMemo } from "react";
import { child, onValue, push, ref, set } from "firebase/database";
import { db } from "../firebase.config.jsx";
import { selectCredential } from "../features/credentialSlice";

const RepairContinueScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      genre,
      amount,
      short_description,
      estimateTotal,
    },
  } = useRoute();

  // Redux
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const selectUserCredential = useSelector(selectCredential);

  useEffect(() => {
    dispatch(
      addToCart({
        id,
        imgUrl,
        title: title + " - Repair",
        genre,
        amount,
        short_description,
        estimateTotal,
      })
    );
  }, [dispatch]);

  //firebase
  function writeUserCartFirebase(
    userId,
    itemId,
    imgUrl,
    title,
    genre,
    amount,
    short_description,
    estimateTotal
  ) {
    const newKey = push(child(ref(db), "cart/" + userId)).key;
    set(ref(db, "cart/" + userId + "/" + newKey), {
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
  useMemo(() => {
    writeUserCartFirebase(
      selectUserCredential[0].userId,
      id,
      imgUrl,
      title,
      genre,
      amount,
      short_description,
      estimateTotal
    );
  }, []);

  return (
    <View className="absolute bottom-0 h-50 w-full">
      <View className="bg-gray-100 rounded-t-3xl">
        <View className="px-5 py-3 border-b border-[#7cc464] rounded-t-3xl shadow-xs">
          <View className="items-center">
            <Text className="bg-gray-500 justify-center h-1 w-16 mb-2 rounded-3xl"></Text>
            <Text className="text-2xl font-bold text-center">
              Continue To Cart?
            </Text>
            <Text className="text-center text-gray-400">Auto Computation</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-200 absolute top-3 right-5"
          >
            <XCircleIcon color="#7cc464" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className="bg-white items-center">
          <Text className="p-2 text-gray-500">
            Our team will contact you soon!
          </Text>
        </View>
        <View className="flex-row items-center justify-between p-5 my-2 bg-white ">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Action");
            }}
            className="rounded-2xl bg-[#7cc464] p-4 ml-8"
          >
            <Text className="text-center text-white text-lg font-bold">
              Add more items
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart");
            }}
            className="flex-row items-center space-x-2 rounded-2xl bg-[#7cc464] p-4 mr-8"
          >
            <ShoppingCartIcon size={30} color="white" />
            <Text className="text-center text-white text-lg font-bold">
              Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RepairContinueScreen;
