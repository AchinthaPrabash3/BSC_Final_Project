import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomBtn = ({
  title,
  containerStyles,
  handlePress,
  loading,
  textStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={loading}
      activeOpacity={0.7}
      className={`h-16 items-center justify-center ${
        loading ? "opacity-50" : ""
      } ${containerStyles}`}
    >
      <Text className={`${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CustomBtn;
