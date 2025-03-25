import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const BaughtTickets = ({ eventId, price }) => {
  const { eventname, location, date, $id } = eventId;
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleString());
  }, []);

  return (
    <View className="bg-white shadow-lg rounded-2xl p-4 mb-4 border border-gray-200">
      {/* Event Name (Clickable) */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "events_page/[id]",
            params: { $id },
          })
        }
      >
        <Text className="text-xl font-semibold text-gray-800">{eventname}</Text>
      </TouchableOpacity>

      {/* Event Details */}
      <Text className="text-gray-600 mt-1">
        {formattedDate} • {location}
      </Text>

      {/* Price */}
      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-white font-semibold text-lg  bg-lime-500 px-4 py-2 rounded-lg self-start">
          {price} Rs
        </Text>
        {new Date() > new Date(date) ? (
          ""
        ) : (
          <TouchableOpacity className="py-2 px-4 self-end bg-red-600 rounded-lg">
            <Text className="text-xl font-bold capitalize text-white">
              cancel
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BaughtTickets;
