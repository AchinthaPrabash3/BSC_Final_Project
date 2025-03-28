import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CustomBtn from "../components/CustomBtn";
import { router } from "expo-router";
const EventCard = ({
  $id,
  eventname,
  date,
  prices,
  location,
  ticket_count,
  banner,
  event_desc,
  price_titles,
}) => {
  const [showDate, setShowDate] = useState("");
  const [showTime, setShowTime] = useState("");

  useEffect(() => {
    if (!date) return; // Prevent errors if date is undefined

    const dates = new Date(date);
    const year = dates.getFullYear();
    const month = dates.getMonth() + 1; // Months are 0-based
    const day = dates.getDate();
    const hour = dates.getHours(); // Use getHours() instead of getUTCHours()
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = (hour % 12 || 12).toString().padStart(2, "0");
    const minutes = dates.getMinutes().toString().padStart(2, "0");

    setShowDate(
      `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`
    );
    setShowTime(`${formattedHour}:${minutes} ${amPm}`);
  }, [date]);

  return (
    <TouchableOpacity
      disabled={new Date() > new Date(date)}
      onPress={() =>
        router.push({
          pathname: "events_page/[id]",
          params: {
            $id,
            eventname,
            date,
            prices: JSON.stringify(prices),
            location,
            ticket_count: JSON.stringify(ticket_count),
            banner,
            event_desc,
            price_titles: JSON.stringify(price_titles),
          },
        })
      }
      className="bg-white p-3 rounded-xl"
    >
      <View className="flex-row justify-between w-full">
        <Text className="text-3xl capitalize font-bold">{eventname}</Text>
      </View>
      <Image
        source={{ uri: banner }}
        className="w-full h-[300px] rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-row items-center justify-between mt-4">
        <View>
          <View className="flex-row w-full justify-between">
            <View className="gap-2 w-full">
              <View className="flex-row gap-2 items-center justify-between">
                <Text className="capitalize  font-bold text-xl ">
                  📅 {showDate}
                </Text>
                <Text
                  className={`${
                    new Date() > new Date(date)
                      ? "text-red-400"
                      : "text-lime-400"
                  } font-semibold text-xl`}
                >
                  {new Date() > new Date(date) ? "Ended" : "upcoming"}
                </Text>
              </View>
              <Text className=" leading font-bold text-xl">
                📍 {location} | 🕒 {showTime}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default EventCard;
