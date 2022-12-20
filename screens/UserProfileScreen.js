import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DashboardItems from "../components/DashboardItems";
import { onValue, ref, update } from "firebase/database";
import { db } from "../firebase.config";
import { selectCredential } from "../features/credentialSlice";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

const UserProfileScreen = () => {
  const navigation = useNavigation();

  const [button1, setButton1] = useState(0);
  const [button2, setButton2] = useState(0);

  // for reading firebase
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [point, setPoint] = useState(0);
  const [place, setPlace] = useState("");

  const [changeName, setChangeName] = useState(name);
  const [changePhone, setChangePhone] = useState(phone);

  //redux
  const selectUserCredential = useSelector(selectCredential);
  // read firebase
  function readCredentialFirebase(userId) {
    const starCountRef = ref(db, "users/" + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setPlace(data.location.place);
      setPoint(data.totalHistoryPoints);
    });
  }
  useEffect(() => {
    readCredentialFirebase(selectUserCredential[0].userId);
  });
  // update user function firebase
  function writeUserFirebase(userId, x, y) {
    update(ref(db, "users/" + userId), {
      name: x,
      phone: y,
    });
  }

  // Keyboard
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <View>
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
        </View>
        <ScrollView>
          {/* User Information */}
          <View className="flex-row justify-items-stretch px-10 pt-6">
            <View className="w-28 h-28 rounded-md">
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
                }}
                className="h-28 w-28 p-4 rounded-md"
              />
            </View>
            <View className="flex-1 p-3 justify-center">
              <Text className="text-2xl font-bold">{name}</Text>
              <Text className="text-base">{email}</Text>
              <Text className="text-base">{phone}</Text>
            </View>
          </View>

          {/* Dashboard */}
          <View className="flex-row w-92 h-20 rounded-2xl bg-[#7cc464] mt-8 mb-4 mx-8 justify-evenly items-center">
            <DashboardItems id={123} title="Points" value={point} />
            <DashboardItems id={123} title="Wallet" value={0} />
            <DashboardItems id={123} title="Voucher" value={0} />
          </View>

          {/* Details Area */}
          <Text className="text-xl font-medium self-center mt-2">
            Personal Details
          </Text>
          <View className="rounded-xl mx-6 my-3 bg-white">
            <View className="w-96 pb-4 px-4 self-center flex"></View>
            <View className="pt-2 px-4">
              <Text className="">First Name</Text>
              <TextInput
                value={changeName}
                onChangeText={(Text) => {
                  setChangeName(Text);
                  setButton1(1);
                }}
                placeholder={name}
                className="w-full h-8 border-b"
              />
            </View>
            <View className="pt-2 px-4">
              <Text className="pt-4">Phone number</Text>
              <TextInput
                value={changePhone}
                onChangeText={(Text) => {
                  setChangePhone(Text);
                  setButton2(1);
                }}
                placeholder={phone}
                className="w-full h-8 border-b"
              />
            </View>
            <View className="pt-2 px-4 w-96">
              <Text className="pt-4">Location Address</Text>
              <View className="flex-row justify-between ">
                <Text className="pt-2 flex-1 text-gray-400">{place}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddAddress");
                  }}
                  className="pt-2"
                >
                  <Text className="text-[#7cc464] mr-4"> Change</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              disabled={button1 + button2 < 1}
              onPress={() => {
                writeUserFirebase(
                  selectUserCredential[0].userId,
                  changeName,
                  changePhone
                );
              }}
              className={
                button1 + button2 < 1
                  ? "self-center mx-4 mt-4 mb-4 px-8 py-3 rounded-xl bg-gray-300"
                  : "self-center mx-4 mt-4 mb-4 px-8 py-3 rounded-xl bg-[#7cc464]"
              }
            >
              <Text className="text-base text-white">Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {keyboardStatus == "Keyboard Shown" ? null : <Footer />}
    </>
  );
};

export default UserProfileScreen;
