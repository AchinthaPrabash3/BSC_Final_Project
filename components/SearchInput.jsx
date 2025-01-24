import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

const SearchInput = () => {
  return (
    <View className="flex-row items-center mt-5 gap-2">
      <View className="h-16 grow rounded-lg overflow-hidden">
        <TextInput className="flex-none size-full bg-red-200 px-4" />
      </View>
      <TouchableOpacity className="size-10 rounded-full flex-none bg-slate-400"></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchInput;
