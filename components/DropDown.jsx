import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DropDown = ({ value, handleChange }) => {
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const [isFocus, setIsFocus] = useState(false);
  return (
    <View className="h-16 bg-white rounded-lg items-center justify-center px-2">
      <Dropdown
        style={{ width: "100%" }}
        className="w-full"
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Item ..." : "..."}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DropDown;
