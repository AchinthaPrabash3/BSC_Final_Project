import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { cancelGigOrders, rateGig } from "../lib/appwrite"; // Assuming cancelGig function exists
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
      alert("Thank you for your feedback!");
    } catch (error) {
      console.error(error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleCancelGig = async () => {
    Alert.alert(
      "Cancel Gig",
      "Are you sure you want to cancel this gig?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await cancelGigOrders($id);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 mb-4">
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

      {/* Security Code & Buttons */}
      <View className="flex-row justify-between items-center mt-3">
        <Text className="text-xl font-mono tracking-widest bg-gray-200 px-3 py-1 rounded-lg">
          {securityCode || "N/A"}
        </Text>

        <View className="flex-row items-center gap-3">
          {/* Cancel Button */}
          {!canceled && !completed && (
            <TouchableOpacity
              onPress={handleCancelGig}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Cancel</Text>
            </TouchableOpacity>
          )}

          {/* Rate Button */}
          <TouchableOpacity
            disabled={!completed || rated}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-lg ${
              !completed || rated ? "opacity-50 bg-gray-300" : "bg-yellow-500"
            }`}
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white font-semibold">Rate</Text>
            <Ionicons
              name="star"
              size={20}
              color={completed && !rated ? "gold" : "gray"}
            />
          </TouchableOpacity>
        </View>
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

            <View className="flex-row justify-center gap-2 my-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => setRating(num.toString())}
                >
                  <Ionicons
                    name="star"
                    size={30}
                    color={num <= (rating || 0) ? "gold" : "gray"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={submitRating}
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BaughtGigCard;
