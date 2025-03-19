import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

const EventSearch = ({ placeholder, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || " ");
  return (
    <View className="flex-row items-center mt-5 gap-2 border rounded-lg px-2 border-lime-400 bg-white">
      <View className="h-16 grow overflow-hidden">
        <TextInput
          onSubmitEditing={() => {
            router.push({
              pathname: "/search_events/[query]",
              params: { query: query },
            });
            setQuery("");
          }}
          className="flex-none size-full px-4 placeholder:text-xl placeholder:text-slate-400 "
          placeholder={placeholder}
          onChangeText={(e) => setQuery(e)}
        />
      </View>
      <TouchableOpacity className="rounded-full flex-none">
        <AntDesign name="search1" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EventSearch;
