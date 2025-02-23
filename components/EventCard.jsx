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
}) => {
  const [showDate, setShowDate] = useState("");
  const dates = new Date(date);
  useEffect(() => {
    const year = dates.getFullYear();
    const month = dates.getMonth();
    const day = dates.getDate();
    const hour = dates.getUTCHours();
    const formatedHour = (hour % 12 || 12).toString().padStart(2, "0");
    const minutes = dates.getUTCMinutes().toString().padStart(2, "0");
    setShowDate(
      `${year}-${(month + 1).toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`
    );
  }, []);
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "events_page/[id]",
          params: {
            $id,
            eventname,
            date,
            prices,
            location,
            ticket_count,
            banner,
            event_desc,
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
            <Text className="text-3xl capitalize font-bold w-[200px] leading-none">
              {eventname}
            </Text>
            <Text className="text-2xl font-bold">{prices[0]}.Rs</Text>
          </View>
          <View className="flex-row w-full justify-between">
            <View className="flex-row gap-2 w-full">
              <Text className="capitalize ">
                at <Text className="font-bold text-lg">{location}</Text>
              </Text>
              <Text className="capitalize ">
                - <Text className="font-bold text-lg ">{showDate}</Text>
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
