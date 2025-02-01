import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";

const SearchInput = () => {
  return (
    <View className="flex-row items-center mt-5 gap-2 border rounded-lg px-2 border-second bg-white">
      <View className="h-16 grow overflow-hidden">
        <TextInput
          className="flex-none size-full px-4 placeholder:text-xl placeholder:text-slate-400 "
          placeholder="Search...."
        />
      </View>
      <TouchableOpacity className="rounded-full flex-none">
        <AntDesign name="search1" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchInput;
