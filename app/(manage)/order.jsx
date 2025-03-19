import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { completeOrder, getBookingInfo } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";

const Order = () => {
  const { $id } = useLocalSearchParams();
  const [securityCodes, setSecurityCodes] = useState("");
  const { data } = useAppwrite(getBookingInfo($id));

  const completeOrders = async () => {
    try {
      await completeOrder($id);
      alert("Order completed successfully!");
      router.back();
    } catch (error) {
      console.error(error);
      alert("Failed to complete order. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Ionicons name="chevron-back-outline" size={30} />
      </TouchableOpacity>
      <ScrollView className="bg-white rounded-lg p-4 shadow-md">
        {data?.gigId && (
          <View className="items-center">
            <Image
              source={{ uri: data.gigId.content }}
              className="w-full h-48 rounded-lg mb-4"
            />
            <Text className="text-xl font-bold">{data.gigId.title}</Text>
            <Text className="text-gray-500" numberOfLines={5}>
              {data.gigId.description}
            </Text>
          </View>
        )}
        {data?.buyerId && (
          <View className="flex-row items-center mt-4">
            <Image
              source={{ uri: data.buyerId.avatar }}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View>
              <Text className="font-semibold">{data.buyerId.username}</Text>
            </View>
          </View>
        )}
        <Text className="text-lg font-semibold mt-4 ">
          Price: ${data?.price}
        </Text>
        <Text className="text-lg font-semibold">
          Date: {new Date(data?.date).toDateString()}
        </Text>
        <TextInput
          value={securityCodes}
          onChangeText={setSecurityCodes}
          className="bg-gray-200 p-4 rounded-lg text-center mt-4"
          placeholder="Enter Security Code"
          keyboardType="decimal-pad"
        />
        <TouchableOpacity
          onPress={() => {
            if (data?.securityCode == Number(securityCodes)) {
              completeOrders();
            } else {
              alert("Invalid security code!");
            }
          }}
          className="bg-lime-400 p-4 rounded-lg mt-4 items-center"
        >
          <Text className="text-white font-bold">Complete Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;
