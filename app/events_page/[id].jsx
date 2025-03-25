import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
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
import { useGlobalContext } from "../../context/GlobalProvider";
import { buyTicket, getTicketInfo } from "../../lib/appwrite";

const EventID = () => {
  const { $id } = useLocalSearchParams();

  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");

  const { data, reFeatch, isLoading } = useAppwrite(getTicketInfo($id));
  const {
    eventname,
    date,
    prices,
    location,
    ticket_count,
    banner,
    event_desc,
    price_titles,
  } = data;

  useEffect(() => {
    if (!date) return; // Ensure date exists before processing

    const dates = new Date(date);
    if (isNaN(dates.getTime())) return; // Check if the date is valid

    const year = dates.getFullYear();
    const month = dates.getMonth();
    const day = dates.getDate();
    const hour = dates.getUTCHours();
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = (hour % 12 || 12).toString().padStart(2, "0");
    const minutes = dates.getUTCMinutes().toString().padStart(2, "0");

    setShowDate(
      `${year}-${(month + 1).toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`
    );

    setShowTime(`${formattedHour}:${minutes} ${amPm}`);
  }, [date]); // Run effect when `date` changes

  const { user } = useGlobalContext();
  const [selected, setSelected] = useState(null);
  const [ticketInfo, setTicketInfo] = useState({
    eventId: $id,
    byer: user.$id,
    ticketIndex: null,
    price: 0,
  });

  const [buying, setBuying] = useState(false);

  const handleBuying = async () => {
    if (
      !ticketInfo.eventId ||
      !ticketInfo.byer ||
      !ticketInfo.price ||
      ticketInfo.ticketIndex === null
    ) {
      Alert.alert("Please select a ticket to purchase");
      return;
    }

    setBuying(true);
    try {
      await buyTicket({ ...ticketInfo });
      setTimeout(() => {
        reFeatch?.();
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
      setBuying(false);
    }
  };

  const handleBuyTicketPress = () => {
    Alert.alert(
      "Confirm Purchase", // Title of the alert
      "Are you sure you want to buy this ticket?", // Message in the alert
      [
        {
          text: "Cancel", // First button (Cancel)
          onPress: () => console.log("Purchase canceled"), // Action on cancel
          style: "cancel", // Style for cancel button
        },
        {
          text: "OK", // Second button (OK)
          onPress: handleBuying, // Action on OK (call handleBuying)
        },
      ],
      { cancelable: false } // Prevent dismissing the alert by tapping outside
    );
  };

  return (
    <SafeAreaView className="h-screen bg-gray-100 p-4">
      {isLoading ? (
        <View>loading</View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 5, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center gap-4 mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" size={32} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold flex-1 text-center capitalize">
              {eventname}
            </Text>
          </View>
          <View className="rounded-lg overflow-hidden shadow-md">
            <Image
              source={{ uri: banner }}
              className="w-full h-[500px]"
              resizeMode="cover"
            />
          </View>
          <View className="mt-4 p-4 bg-white rounded-lg shadow">
            <Text className="text-lg font-semibold">📅 {showDate}</Text>
            <Text className="text-lg font-semibold">
              📍 {location} | 🕒 {showTime}
            </Text>
          </View>
          <Text className="text-justify py-3 leading-normal">{event_desc}</Text>
          <View className="mt-4 gap-3">
            {prices?.map((price, i) => (
              <View
                key={i}
                className={`flex-row items-center justify-between p-4 rounded-lg shadow ${
                  selected == i ? "bg-lime-400" : "bg-white"
                }`}
              >
                <View className="flex-row gap-4 items-center">
                  <Text className="capitalize font-bold text-lg">
                    {price_titles[i]}
                  </Text>
                  <Text className="text-lg">{price}.Rs</Text>
                </View>
                <View className="flex-row items-center gap-4">
                  <Text className="text-lg font-medium">
                    🎟 {ticket_count[i]}
                  </Text>
                  <TouchableOpacity
                    className={`px-6 py-2 rounded-lg shadow ${
                      selected === i ? "bg-white" : "bg-lime-400"
                    }`}
                    onPress={() => {
                      setSelected(i);
                      setTicketInfo({
                        ...ticketInfo,
                        ticketIndex: i,
                        price: price,
                      });
                    }}
                  >
                    <Text className="text-lg font-medium capitalize">
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity
            className="h-16 items-center justify-center mt-6 bg-lime-500 rounded-lg shadow"
            disabled={buying}
            onPress={handleBuyTicketPress} // Use the new confirmation handler
          >
            <Text className="text-xl font-bold capitalize text-black">
              Buy Ticket
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default EventID;
