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
  const dates = new Date(date);
  useEffect(() => {
    const year = dates.getFullYear();
    const month = dates.getMonth();
    const day = dates.getDate();
    const hour = dates.getUTCHours();
    const amPm = hour >= 12 ? "PM" : "AM";
    const formatedHour = (hour % 12 || 12).toString().padStart(2, "0");
    const minutes = dates.getUTCMinutes().toString().padStart(2, "0");
    setShowDate(
      `${year}-${(month + 1).toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`
    );

    setShowTime(`${formatedHour}:${minutes} ${amPm}`);
  }, []);

  return (
    <TouchableOpacity
      // disabled={new Date() > new Date(date)}
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
      <Image
        source={{ uri: banner }}
        className="w-full h-[500px] rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-row items-center justify-between mt-4">
        <View>
          <View className="flex-row justify-between w-full">
            <Text className="text-3xl capitalize font-bold leading-none">
              {eventname}
            </Text>
          </View>
          <View className="flex-row w-full justify-between">
            <View className="gap-2 w-full">
              <Text className="capitalize leading-tight ">
                at{" "}
                <Text className="font-bold text-lg leading-none">
                  {location}
                </Text>
              </Text>
              <Text className=" leading-none">
                <Text className="font-bold text-lg  leading-none">
                  {showDate}{" "}
                  <Text className=" capitalize font-normal">from</Text>{" "}
                  {showTime}
                </Text>
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
