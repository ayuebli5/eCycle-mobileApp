import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation, useRoute } from "@react-navigation/native";
import { emptyCart, selectCartPointsTotal } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { onValue, ref, set, update } from "firebase/database";
import { db } from "../firebase.config";
import { selectHistoryPointsTotal } from "../features/historySlice";
import { selectCredential } from "../features/credentialSlice";

const PreparingOrderScreen = () => {
  const {
    params: { pointsFromFirebase },
  } = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  // USER redux
  const selectUserCredential = useSelector(selectCredential);
  const totalHistoryPointsRedux = useSelector(selectHistoryPointsTotal);
  const cartPointsTotalRedux = useSelector(selectCartPointsTotal);

  // update user function firebase
  function writeUserFirebase(userId, totalHistoryPoints) {
    update(ref(db, "users/" + userId), {
      totalHistoryPoints: totalHistoryPoints,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      writeUserFirebase(
        selectUserCredential[0].userId,
        cartPointsTotalRedux + pointsFromFirebase
      );
      dispatch(emptyCart());

      navigation.navigate("Track");
    }, 3000);
  }, [dispatch]);
  // console.log("pointsFromFirebase - prep " + pointsFromFirebase);
  // console.log("cartPointsTotalRedux " + cartPointsTotalRedux);

  return (
    <SafeAreaView className="bg-[#7cc464] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/GIF.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-80 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 font-bold text-center text-white mx-2"
      >
        Hold a second, waiting to set up your request!
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
