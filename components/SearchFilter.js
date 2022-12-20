import { ScrollView } from "react-native";
import React from "react";
import SearchFilterCard from "./SearchFilterCards";

const SearchFilter = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      <SearchFilterCard title="Laptop" />
      <SearchFilterCard title="Phones" />
      <SearchFilterCard title="Tablet" />
      <SearchFilterCard title="Fridge" />
      <SearchFilterCard title="TV" />
      <SearchFilterCard title="Wachine Machine" />
      <SearchFilterCard title="Oven" />
      <SearchFilterCard title="Toys" />
    </ScrollView>
  );
};

export default SearchFilter;
