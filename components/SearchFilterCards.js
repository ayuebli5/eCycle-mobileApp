import { Text, TouchableOpacity, Image, View } from "react-native";
import React, { useState } from "react";

const SearchFilterCard = ({ id, imgUrl, title, subCategory }) => {
  const [activeFilter, setActiveFilter] = useState("");
  const defaultColor = "white";
  const color = "green";
  const selector = "Phone";
  const [pressed, setPressed] = useState(false);
  // const [touched, setTouched] = useState(false);

  // const [items, setitems] = useState([
  //   { key: "1", type: "Laptop", color: "green"},
  //   { key: "2", type: "Phone", color: "green"},
  //   { key: "3", type: "TV", color: "#00ccbb"},
  //   { key: "4", type: "Toy", color: "#00ccbb"},
  // ])

  return (
    <>
      <View
        onPress={() => {
          setActiveFilter(title);
          setPressed(!pressed);
        }}
        className="flex-row pb-2 items-center"
      >
        <Text
          className={
            color == defaultColor && title == selector
              ? "bg-[#7cc464] mx-1 p-2 px-3 rounded-3xl"
              : "bg-white mx-1 p-2 px-3 rounded-3xl"
          }
        >
          {title}
        </Text>
      </View>
    </>
  );
};

export default SearchFilterCard;

//   <TouchableOpacity
//     onPress={() => {
//       setActiveFilter({ title });
//     }}
//     className="flex-row pb-2 items-center"
//   >
//     <Text
//       className={
//         activeFilter === { title }
//           ? "bg-[#7cc464] mx-1 p-2 px-3 rounded-3xl"
//           : "bg-white mx-1 p-2 px-3 rounded-3xl"
//       }
//     >
//       {title}
//     </Text>
//   </TouchableOpacity>
// );
