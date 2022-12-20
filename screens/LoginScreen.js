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
} from "react-native-heroicons/outline";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCredential } from "../features/credentialSlice.js";
import { auth, db, provider } from "../firebase.config.jsx";
import { onValue, ref } from "firebase/database";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorDisplay, setErrorDisplay] = useState("");
  // const [hide, setHide] = useState(true);

  //Redux
  const dispatch = useDispatch();
  const addItemToCredential = (aa) => {
    dispatch(addToCredential(aa));
  };

  // read firebase
  function readCredentialFirebase(x) {
    const starCountRef = ref(db, "users/" + x);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      addItemToCredential(data);
      // console.log("data prop:   " + data);
    });
  }
  // console.log("userId:   " + userId);

  //Firebase login
  function signIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // setUserId(user.uid);
        // console.log("userId:   " + user.uid);
        setErrorDisplay("Correct email/password!");

        readCredentialFirebase(user.uid);
        // setTimeout(() => {
        //   navigation.navigate("Home");
        // }, 1500);
      })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setErrorDisplay("Wrong email/password!");
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
            <Text className="font-bold text-2xl mb-4">Log in</Text>
            <Text>Welcome to eCycle</Text>
          </View>
        </View>
      </View>
      <ScrollView className="mb-72">
        <View className="bg-gray-100 p-1">
          <Text className="font-bold text-2xl px-4 pt-4">
            Log in to your account
          </Text>
          <View className="flex-row items-center bg-gray-200 rounded-3xl px-4 w-[80%] mx-[10%] mt-[5%] h-12">
            <EnvelopeIcon size={30} color="gray" />
            <TextInput
              placeholder="Enter you full Name"
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
              secureTextEntry={true}
              placeholder="Enter you password"
              value={password}
              onChangeText={(Text) => {
                setPassword(Text);
              }}
              className="pl-2 flex-1"
            ></TextInput>
            <TouchableOpacity
            // onPress={setHide(!hide)}
            >
              <EyeSlashIcon size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <Text className="text-red-500 text-sm text-center">
            {errorDisplay == "Wrong email/password!" ? errorDisplay : null}
          </Text>

          <TouchableOpacity
            // onPress={readCredentialFirebase(userId)}
            onPress={signIn}
            className="bg-[#5cab44]  rounded-3xl px-4 w-[80%] mx-[10%] my-[5%] h-12 flex justify-center"
          >
            <Text className="self-center items-center text-white text-xl">
              Log in
            </Text>
          </TouchableOpacity>
          <View className="flex justify-center items-center">
            <View className="flex-row mt-4 mb-4 pt-2 border-t-2 border-gray-300">
              <Text>Don't have an account ?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text className="text-[#5cab44] px-2">SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
