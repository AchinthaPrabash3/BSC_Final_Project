import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cancelTicket } from "../lib/appwrite";

const BaughtTickets = ({ eventId, price, ticketIndex, ticketId, canceled }) => {
  const { eventname, location, date, $id } = eventId;
  const [formattedDate, setFormattedDate] = useState("");

  const [cancelData, setCancelData] = useState({
    eventId: "",
    ticketIndex: "",
    ticketId: "",
  });
  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleString());
    setCancelData({
      eventId: $id,
      ticketIndex: ticketIndex,
      ticketId: ticketId,
    });
  }, []);

  const handleCancelTicket = async () => {
    try {
      await cancelTicket({ ...cancelData });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="bg-white shadow-lg rounded-2xl p-4 mb-4 border border-gray-200">
      {/* Event Name (Clickable) */}
      <View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "events_page/[id]",
              params: { $id },
            })
          }
        >
          <Text className="text-xl font-semibold text-gray-800">
            {eventname}
          </Text>
        </TouchableOpacity>
        {}
      </View>

      {/* Event Details */}
      <Text className="text-gray-600 mt-1">
        {formattedDate} • {location}
      </Text>

      {/* Price */}
      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-white font-semibold text-lg  bg-lime-500 px-4 py-2 rounded-lg self-start">
          {price} Rs
        </Text>
        {new Date() > new Date(date) || canceled ? (
          ""
        ) : (
          <TouchableOpacity
            className="py-2 px-4 self-end bg-red-600 rounded-lg"
            onPress={handleCancelTicket}
          >
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
