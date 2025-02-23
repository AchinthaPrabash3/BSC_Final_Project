import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import useAppwrite from "../../hooks/useAppwrite";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeleteEvent, getTicketSails } from "../../lib/appwrite";

const ManageEvent = () => {
  const { id, title, description, image, date } = useLocalSearchParams();
  const { data } = useAppwrite(getTicketSails(id));

  const handleDelete = async () => {
    if (data.length > 0) {
      Alert.alert("you have already sold tickets for this event");
      return;
    }
    try {
      await DeleteEvent(id);
      router.replace("profile");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row items-center justify-between p-3">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" size={24} />
            </TouchableOpacity>
            <View>
              <Text className="text-xl">{title}</Text>
              <Text className="capitalize text-sm">
                {new Date() == new Date(date)
                  ? `today - `
                  : new Date() < new Date(date)
                  ? "ended - "
                  : "upcoming - "}
                {new Date(date).toLocaleString()}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-bin-outline" size={24} />
          </TouchableOpacity>
        </View>
        <View className="p-4">
          <Image source={{ uri: image }} className="w-[150px] h-[200px]" />
          <View>{/* map the prices */}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ManageEvent;
