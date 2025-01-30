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

const ProductPage = () => {
  const {
    title,
    id,
    description,
    image,
    price,
    priceD,
    user,
    userRating,
    avatar,
    rating,
  } = useLocalSearchParams();
  console.log(JSON.parse(priceD));
  console.log(JSON.parse(price));
  return (
    <SafeAreaView className="h-screen ">
      <ScrollView contentContainerStyle={{ height: "100%" }} className="p-2">
        <View>
          <View className="flex-row">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <View>
              <Text>{title}</Text>
              <Text>{rating}</Text>
            </View>
          </View>
          <Image source={{ uri: image }} className="w-full h-[200px]" />
          <Text>{description}</Text>
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ProductPage;
