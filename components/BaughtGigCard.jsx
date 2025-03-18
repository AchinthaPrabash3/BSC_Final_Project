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
    <View className="bg-lime-400 p-4 rounded-lg">
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "product_page/[id]",
            params: {
              id: gigId.$id,
            },
          })
        }
      >
        <Text className=" mb-2 font-bold">{gigId.title}</Text>
      </TouchableOpacity>
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xl font-bold self-start bg-white px-1 rounded-lg">
            {price} Rs
          </Text>
          <Text className="text-sm pl-1">
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
          className={`${
            canceled
              ? "text-red-800"
              : completed
              ? "text-lime-800"
              : "text-black"
          } self-start bg-white font-medium p-2 rounded-lg`}
        >
          {canceled ? "Canceled" : completed ? "Completed" : "Pending"}
        </Text>
      </View>
      <View className="flex-row justify-between mt-2 items-center">
        <Text
          className="text-2xl bg-white px-2 rounded-lg"
          style={{ letterSpacing: 4 }}
        >
          {securityCode || "N/A"}
        </Text>
        <TouchableOpacity
          disabled={!completed || rated}
          className="flex-row items-center gap-2"
          onPress={() => setModalVisible(true)}
        >
          <Text className="capitalize">Rate</Text>
          <Ionicons name="star" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-5 rounded-lg w-80">
            <Text className="text-lg font-bold mb-2">Rate this gig</Text>
            <TextInput
              className="border p-2 rounded-lg text-center"
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
