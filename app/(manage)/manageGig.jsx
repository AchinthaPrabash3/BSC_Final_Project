import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../hooks/useAppwrite";
import { cancelGigOrders, deleteGig, getOrders } from "../../lib/appwrite";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const ManageGig = () => {
  const { id, title, description, image, rating, activeOrders } =
    useLocalSearchParams();
  const { data } = useAppwrite(getOrders(id));
  const [isDeleteing, setIsDeleting] = useState(false);

  const deletingGig = async () => {
    if (activeOrders > 0) {
      Alert.alert("complete all the orders or cancel the orders");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteGig(id);
      router.replace("profile");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCnacelOrder = async (orderId) => {
    try {
      await cancelGigOrders(orderId);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
        <View className="flex-row items-center justify-between  py-3 gap-3">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
            <View>
              <Text>{title}</Text>
              <View className="flex-row">
                {[...Array(5)].map((_, index) => (
                  <AntDesign
                    size={10}
                    key={index}
                    name="star"
                    color={index < rating ? "#FAD5A5" : "#808080"}
                  />
                ))}
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => deletingGig()}>
            <MaterialCommunityIcons name="delete-outline" size={24} />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: image }}
          className="w-full h-[200px]"
          resizeMode="cover"
        />
        <View className="w-full items-center justify-end p-2 flex-row gap-2">
          <AntDesign name="edit" size={24} />
        </View>
        {data.map((items, i) => (
          <View
            key={i}
            className="flex-row items-center justify-between h-[100px]"
          >
            <View>
              <Text>{items.canceled ? "canceled" : "live"}</Text>
              <Text>{items.price}</Text>
            </View>
            <TouchableOpacity
              className={`w-[100px] items-center justify-center h-16 ${
                items.canceled ? "bg-slate-200" : "bg-lime-400"
              }`}
              onPress={() =>
                Alert.alert(
                  "Order Cancellation", // Title of the alert
                  "This order will be canceled.", // Message to display
                  [
                    {
                      text: "Cancel", // Text for the Cancel button
                      onPress: () => console.log("Cancel Pressed"), // Action when Cancel is pressed
                      style: "cancel", // Optional: Adds a visual style to indicate it's a cancel action
                    },
                    {
                      text: "OK", // Text for the OK button
                      onPress: () => handleCnacelOrder(items.$id), // Action when OK is pressed
                    },
                  ],
                  { cancelable: false } // Optional: Prevents dismissing the alert by tapping outside
                )
              }
              disabled={items.canceled}
            >
              <Text>cancel order</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ManageGig;
