import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  Bars3Icon,
  HomeIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { activeTabRedux, setActiveTabRedux } from "../features/footerSlice";

const Footer = () => {
  const navigation = useNavigation();

  // const [activeTab, setActiveTab] = useState("Home");
  const activeTab = useSelector(activeTabRedux);
  const dispatch = useDispatch();
  const setActiveTab = (page) => {
    dispatch(setActiveTabRedux(page));
  };

  return (
    <View className="bg-white flex-row item-center justify-between px-12 py-2 absolute bottom-0 w-full">
      <TouchableOpacity
        onPress={() => [setActiveTab("Home"), navigation.navigate("Home")]}
      >
        <HomeIcon
          size={34}
          color={activeTab == "Home" ? "#7cc464" : "lightgrey"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => [setActiveTab("Cart"), navigation.navigate("Cart")]}
      >
        <ShoppingCartIcon
          size={34}
          color={activeTab == "Cart" ? "#7cc464" : "lightgrey"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => [setActiveTab("Bar"), navigation.navigate("Settings")]}
      >
        <Bars3Icon
          size={34}
          color={activeTab == "Bar" ? "#7cc464" : "lightgrey"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
