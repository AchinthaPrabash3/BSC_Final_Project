import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { rateGig } from "../lib/appwrite";
import { router } from "expo-router";

const BaughtGigCard = ({
  price,
  date,
  canceled,
  completed,
  securityCode,
  rated,
  gigId,
  $id,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState("");

  const submitRating = async () => {
    const numericRating = parseInt(rating, 10);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      alert("Please enter a valid rating between 1 and 5.");
      return;
    }
    try {
      await rateGig(gigId, numericRating, $id);
    } catch (error) {
      console.error(error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 mb-4">
      {/* Gig Title (Clickable) */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "product_page/[id]",
            params: { id: gigId.$id },
          })
        }
      >
        <Text className="text-lg font-bold text-gray-800">{gigId.title}</Text>
      </TouchableOpacity>

      {/* Gig Details */}
      <View className="flex-row justify-between items-center mt-2">
        <View>
          <Text className="text-lg font-semibold text-gray-700 bg-lime-500 px-3 py-1 rounded-lg self-start ">
            {price} Rs
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            {date
              ? new Date(date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Invalid Date"}
          </Text>
        </View>

        <Text
          className={`text-sm font-medium px-3 py-1 rounded-lg ${
            canceled
              ? "bg-red-100 text-red-700"
              : completed
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {canceled ? "Canceled" : completed ? "Completed" : "Pending"}
        </Text>
      </View>

      {/* Security Code & Rating Button */}
      <View className="flex-row justify-between items-center mt-3">
        <Text className="text-xl font-mono tracking-widest bg-gray-200 px-3 py-1 rounded-lg">
          {securityCode || "N/A"}
        </Text>

        <TouchableOpacity
          disabled={!completed || rated}
          className={`flex-row items-center gap-2 ${
            !completed || rated ? "opacity-50" : ""
          }`}
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-gray-800 text-sm font-semibold">Rate</Text>
          <Ionicons
            name="star"
            size={20}
            color={completed && !rated ? "gold" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* Rating Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <Text className="text-lg font-bold mb-3 text-center">
              Rate this gig
            </Text>

            <TextInput
              className="border p-3 rounded-lg text-center text-lg"
              placeholder="Enter rating (1-5)"
              keyboardType="numeric"
              maxLength={1}
              value={rating}
              onChangeText={(text) => setRating(text.replace(/[^1-5]/g, ""))}
            />

            <View className="flex-row justify-between mt-4">
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={submitRating} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BaughtGigCard;
