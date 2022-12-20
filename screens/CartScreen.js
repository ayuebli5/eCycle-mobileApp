import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowRightIcon, UserIcon } from "react-native-heroicons/solid";
import CartItems from "../components/CartItems";
import History from "../components/History";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../features/cartSlice";
import { selectHistoryItems } from "../features/historySlice";
import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase.config.jsx";
import { selectCredential } from "../features/credentialSlice";
import Footer from "../components/Footer";

const CartScreen = () => {
  const navigation = useNavigation();
  // Redux
  const itemsCart = useSelector(selectCartItems);
  const historyItems = useSelector(selectHistoryItems);
  const dispatch = useDispatch();
  const selectUserCredential = useSelector(selectCredential);

  // Firebase
  // read history firebase
  const [listHistoryFirebase, setListHistoryFirebase] = useState({});
  function readHistoryFirebase(userID) {
    const starCountRef = ref(db, "history/" + userID);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setListHistoryFirebase(data);
    });
  }

  const [place, setPlace] = useState("");

  // read cart firebase
  const [listCartFirebase, setListCartFirebase] = useState({});
  function readCartFirebase(userID) {
    const starCountRef = ref(db, "cart/" + userID);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setListCartFirebase(data);
    });
    const myRef = ref(db, "users/" + userID);
    onValue(myRef, (snap) => {
      const myData = snap.val();
      setPlace(myData.location.place);
    });
  }

  useMemo(() => {
    readHistoryFirebase(selectUserCredential[0].userId);
    readCartFirebase(selectUserCredential[0].userId);
  }, []);

  return (
    <>
      <View className="h-full relative flex">
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
        <ScrollView className="mb-28">
          <Text className="font-semibold text-2xl ml-2 mt-2 pb-2 px-2">
            Cart
          </Text>
          {/* When Cart is empty */}
          <View>
            {itemsCart <= 0 ? (
              <View className="items-center justify-center p-6 bg-white border border-gray-300 rounded-xl mx-2">
                <ShoppingCartIcon size={55} color="#7cc464" />

                <View className="flex-row ">
                  <View className="px-8 py-4">
                    <Text className="font-bold text-2xl">
                      Your Cart is empty
                    </Text>
                    <Text className="text-sm text-gray-400">
                      Let's Go! Do your first recycle!
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
          {/* Cart */}
          {Object.entries(itemsCart).map(([key, items]) => (
            <View key={key}>
              <CartItems
                id={items.id}
                imgUrl={items.imgUrl}
                genre={items.genre}
                title={items.title}
                short_description={items.short_description}
                amount={items.amount}
                estimateTotal={items.estimateTotal}
              />
            </View>
          ))}

          {/* Track button */}
          <View className="items-center">
            <TouchableOpacity
              disabled={listHistoryFirebase == null}
              onPress={() => {
                navigation.navigate("Track");
              }}
              className={
                listHistoryFirebase == null
                  ? "flex-row  space-x-2 bg-gray-300 px-28 py-3 rounded-xl mx-4 my-3 "
                  : "flex-row  space-x-2 bg-[#7cc464] px-28 py-3 rounded-xl mx-4 my-3 "
              }
            >
              <TruckIcon size={30} color="white" />
              <Text className="text-center text-white text-xl font-semibold">
                TRACK
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="font-semibold text-2xl ml-2 pb-2 px-2">History</Text>
          {/* When History is empty */}
          <View>
            {listHistoryFirebase == null && historyItems <= 0 ? (
              <View className="items-center justify-center p-6 bg-white border border-gray-300 rounded-xl mx-2">
                <InformationCircleIcon size={55} color="#7cc464" />

                <View className="flex-row ">
                  <View className="px-8 py-4">
                    <Text className="font-bold text-2xl">
                      Your History is empty
                    </Text>
                    <Text className="text-sm text-gray-400">
                      Let's Go! Do your first recycle!
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>

          {/* History */}
          {Object.entries(
            listHistoryFirebase == null ? historyItems : listHistoryFirebase
          ).map(([key, items]) => (
            <View key={key}>
              <History
                id={items.id}
                imgUrl={items.imgUrl}
                genre={items.genre}
                title={items.title}
                short_description={items.short_description}
                amount={items.amount}
                estimateTotal={items.estimateTotal}
              />
            </View>
          ))}
        </ScrollView>
        <View className="absolute items-center bottom-10 w-full bg-gray-50">
          <TouchableOpacity
            disabled={itemsCart.length <= 0}
            onPress={() => {
              navigation.navigate("Checkout", { place });
            }}
            className={
              itemsCart.length <= 0
                ? "flex-row  space-x-2 bg-gray-300 px-24 py-3 rounded-xl mx-4 my-3 "
                : "flex-row  space-x-2 bg-[#7cc464] px-24 py-3 rounded-xl mx-4 my-3 "
            }
          >
            <CheckCircleIcon size={30} color="white" />
            <Text className="font-semibold text-xl text-white ">CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default CartScreen;
