import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EventID = () => {
  const {
    $id,
    eventname,
    date,
    prices,
    location,
    ticket_count,
    banner,
    event_desc,
  } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <View className=" flex-row">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <View className="mt-4">
          <Image source={{ uri: banner }} className="w-full h-[400px]" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default EventID;
