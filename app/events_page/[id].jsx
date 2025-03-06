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
import { buyTicket } from "../../lib/appwrite";

const EventID = () => {
  const {
    $id,
    eventname,
    date,
    prices,
    location,
    ticket_count,
    banner,
    event_desc,
    price_titles,
  } = useLocalSearchParams();

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
      Alert.alert("select a ticket to perchase");
      return;
    }

    setBuying(true);
    try {
      await buyTicket({ ...ticketInfo });
    } catch (error) {
      console.error(error);
    } finally {
      setBuying(false);
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <ScrollView
        contentContainerStyle={{ padding: 10, paddingBottom: 15, flexGrow: 1 }}
      >
        <View className=" flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={32} />
          </TouchableOpacity>
          <Text className="text-2xl py-2 text-center">{eventname}</Text>
        </View>
        <View className="">
          <Image
            source={{ uri: banner }}
            className="w-full h-[500px] rounded-lg"
          />
          <View className="flex-row justify-between items-center pt-2">
            <Text className="text-xl font-bold">{showDate}</Text>
            <Text className="text-xl font-bold">
              <Text className="font-normal">At </Text>
              <Text>{location}</Text>
              <Text className="font-normal"> From </Text>
              <Text>{showTime}</Text>
            </Text>
          </View>
        </View>
        <View className="gap-2 mt-4">
          {JSON.parse(prices).map((price, i) => (
            <View
              key={i}
              className={`flex-row items-center justify-between p-2 rounded-lg ${
                selected == i ? "bg-lime-400" : "bg-slate-200"
              } `}
            >
              <View className="flex-row gap-4">
                <Text className="capitalize font-bold">
                  {JSON.parse(price_titles)[i]}
                </Text>
                <Text>{price}.Rs</Text>
              </View>
              <View className="flex-row items-center gap-4">
                <Text>{JSON.parse(ticket_count)[i]}</Text>
                <TouchableOpacity
                  className={`px-7 py-4 ${
                    selected === i ? "bg-white" : "bg-lime-400"
                  } rounded-lg`}
                  onPress={() => {
                    setSelected(i);
                    setTicketInfo({
                      ...ticketInfo,
                      ticketIndex: i,
                      price: price,
                    });
                  }}
                >
                  <Text>select</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          className="h-16 items-center justify-center mt-5 bg-lime-400 rounded-lg"
          disabled={buying}
          onPress={handleBuying}
        >
          <Text className="capitalize font-bold">buy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default EventID;
