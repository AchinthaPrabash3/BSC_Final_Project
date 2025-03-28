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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  cancelGigOrders,
  completeOrder,
  getBookingInfo,
} from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";

const Order = () => {
  const { $id } = useLocalSearchParams();
  const [securityCodes, setSecurityCodes] = useState("");
  const { data } = useAppwrite(getBookingInfo($id));

  const completeOrders = async () => {
    try {
      await completeOrder($id);
      Alert.alert("Order completed successfully!");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to complete order. Please try again.");
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cancelGigOrders($id);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Ionicons name="chevron-back-outline" size={30} />
      </TouchableOpacity>

      <ScrollView className="bg-white rounded-lg p-4 shadow-md">
        {/* Gig Details */}
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

        {/* Buyer Details */}
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

        {/* Price & Date */}
        <Text className="text-lg font-semibold mt-4">
          Price: ${data?.price}
        </Text>
        <Text className="text-lg font-semibold">
          Date: {new Date(data?.date).toDateString()}
        </Text>

        {/* Security Code Input */}
        <TextInput
          value={securityCodes}
          onChangeText={setSecurityCodes}
          className="bg-gray-200 p-4 rounded-lg text-center mt-4"
          placeholder="Enter Security Code"
          keyboardType="decimal-pad"
        />

        {/* Complete Order Button */}
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

        {/* Cancel Order Button */}
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Cancel Order",
              "Are you sure you want to cancel this order?",
              [
                { text: "No", style: "cancel" },
                { text: "Yes", onPress: handleCancelOrder },
              ],
              { cancelable: true }
            )
          }
          className="bg-red-500 p-4 rounded-lg mt-4 items-center"
        >
          <Text className="text-white font-bold">Cancel Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;
