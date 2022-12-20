import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  EnvelopeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.config.jsx";
import { useNavigation } from "@react-navigation/native";
import { ref, set } from "firebase/database";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [errorDisplay, setErrorDisplay] = useState("");

  const [userName, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState({
    place: "Enter your location address",
    lat: "24.5",
    long: "54.6",
  });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // Firebase
  function writeUserFirebase(
    userId,
    email,
    name,
    phone,
    location,
    totalHistoryPoints
  ) {
    set(ref(db, "users/" + userId), {
      userId: userId,
      email: email,
      name: name,
      phone: phone,
      location: location,
      totalHistoryPoints: totalHistoryPoints,
    });
  }

  //Firebase
  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const email = user.email;
        const userId = user.uid;

        setErrorDisplay("Correct email/password!");

        writeUserFirebase(userId, email, userName, phone, location, 0);
        navigation.navigate("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
        errorMessage == "Firebase: Error (auth/invalid-email)."
          ? setErrorDisplay("Wrong email format")
          : setErrorDisplay("Password should be at least 6 characters");
        console.log(errorMessage == "Firebase: Error (auth/invalid-email).");
      });
  }

  return (
    <View>
      <View className="bg-white w-full h-72 flex justify-end border-b-2 border-[#5cab44]">
        <View>
          <Image
            source={{
              uri: "https://tunza.eco-generation.org/file/e-waste%20recycling%20logo.jpg",
            }}
            className="h-[90%] w-[60%] self-end"
          />
          <View className="absolute top-16 left-6">
            <Text className="font-bold text-2xl mb-4">Sign Up</Text>
            <Text>Welcome to Ecycle</Text>
          </View>
        </View>
      </View>
      <ScrollView className="mb-72">
        <View className="bg-gray-100 p-1">
          <Text className="font-bold text-2xl px-4 pt-4">
            Create an account
          </Text>
          <View className="flex-row items-center bg-gray-200 rounded-3xl px-4 w-[80%] mx-[10%] mt-[5%] h-12">
            <UserIcon size={30} color="gray" />
            <TextInput
              placeholder="Enter full Name"
              value={userName}
              onChangeText={(Text) => {
                setUserName(Text);
              }}
              className="pl-2"
            ></TextInput>
          </View>
          <View className="flex-row items-center bg-gray-200 rounded-3xl px-4 w-[80%] mx-[10%] mt-[5%] h-12">
            <PhoneIcon size={30} color="gray" />
            <TextInput
              placeholder="Enter phone number"
              value={phone}
              onChangeText={(Text) => {
                setPhone(Text);
              }}
              className="pl-2"
            ></TextInput>
          </View>

          <View className="flex-row items-center bg-gray-200 rounded-3xl px-4 w-[80%] mx-[10%] mt-[5%] h-12">
            <EnvelopeIcon size={30} color="gray" />
            <TextInput
              placeholder="Enter email"
              value={email}
              onChangeText={(Text) => {
                setEmail(Text);
              }}
              className="pl-2"
            ></TextInput>
          </View>
          <View className="flex-row items-center bg-gray-200 rounded-3xl px-4 w-[80%] mx-[10%] my-[5%] h-12">
            <LockClosedIcon size={30} color="gray" />
            <TextInput
              placeholder="Enter password"
              value={password}
              onChangeText={(Text) => {
                setPassword(Text);
              }}
              className="pl-2 flex-1"
            ></TextInput>
            <TouchableOpacity>
              <EyeSlashIcon size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <Text className="text-red-500 text-sm text-center">
            {errorDisplay == "Wrong email format" ||
            "Password should be at least 6 characters"
              ? errorDisplay
              : null}
          </Text>

          <TouchableOpacity
            onPress={signUp}
            className="bg-[#5cab44]  rounded-3xl px-4 w-[80%] mx-[10%] my-[5%] h-12 flex justify-center"
          >
            <Text className="self-center items-center text-white text-xl">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
