import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  ArrowLeftIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";
import { urlFor } from "../sanity";
import Footer from "../components/Footer";

const FillDeviceInfoScreen = () => {
  const navigation = useNavigation();
  const {
    params: { id, imgUrl, title, genre, estimatedPoint, short_description },
  } = useRoute();

  // Redux
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        id,
        imgUrl,
        title,
        genre,
        estimatedPoint,
        additionalPoints1,
        additionalPoints2,
        amount,
        short_description,
      })
    );
  };
  useEffect(() => {
    dispatch(removeFromBasket());
  }, [dispatch]);

  //additional Points
  const [additionalPoints1, setAdditionalPoints1] = useState(0);
  const [additionalPoints2, setAdditionalPoints2] = useState(0);

  // Dropdown
  const yearBought = [
    { key: "2", value: "Before 2010" },
    { key: "3", value: "After 2010" },
  ];
  const canBeReused = [
    { key: "2", value: "No", label: "Apple" },
    { key: "3", value: "Yes", label: "Babab" },
  ];
  //  number plus minus
  let [amount, setAmount] = useState(1);

  return (
    <>
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-500 p-5"
          />
        </View>
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLeftIcon size={20} color="#7cc464" />
        </TouchableOpacity>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="font-bold text-2xl">{title}</Text>
            <Text className="font-medium text-xl">{genre}</Text>
            <View className="flex-row space-x-2 my-1 mb-2"></View>
          </View>
        </View>

        {/* Details Area */}
        <Text className="text-xl mx-7 mt-5">Fill Device Details</Text>
        <View className="rounded-xl mx-7 my-3 bg-white">
          <View className="w-96 pb-4 px-4 self-center flex"></View>

          <View className="pb-2 px-4">
            <Text className="mb-1">Which year range was it bought?</Text>
            {/* DropDown  */}
            <View className="z-300">
              <SelectList
                setSelected={(val) =>
                  val == "After 2010"
                    ? setAdditionalPoints1(2)
                    : setAdditionalPoints1(0)
                }
                data={yearBought}
                save="value"
              />
            </View>
          </View>
          <View className="pb-2 px-4">
            <Text className="mb-1">Do you think it can be reused?</Text>
            <View className="z-300">
              <SelectList
                setSelected={(val) =>
                  val == "Yes"
                    ? setAdditionalPoints2(2)
                    : setAdditionalPoints2(0)
                }
                data={canBeReused}
                save="value"
              />
            </View>
          </View>
          {/* Plus / Minus */}
          <View className="bg-white px-4">
            <View className="flex-row items-center space-x-2 pb-3">
              <Text> Quantity: </Text>
              <TouchableOpacity
                disabled={amount <= 1}
                onPress={() => setAmount((amount -= 1))}
              >
                <MinusCircleIcon
                  size={40}
                  color={amount <= 1 ? "gray" : "#7cc464"}
                />
              </TouchableOpacity>
              <Text> {amount} </Text>
              <TouchableOpacity onPress={() => setAmount((amount += 1))}>
                <PlusCircleIcon size={40} color="#7cc464" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPressIn={addItemToBasket}
            onPress={() => {
              navigation.navigate("Estimate", {
                id,
                imgUrl,
                title,
                genre,
                amount,
                short_description,
              });
            }}
            className="self-center mx-4 mt-4 mb-4 px-8 py-3 rounded-2xl bg-[#7cc464]"
          >
            <Text className=" font-normal text-xl text-white">Estimate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
};

export default FillDeviceInfoScreen;
