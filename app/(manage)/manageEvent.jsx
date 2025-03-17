import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import useAppwrite from "../../hooks/useAppwrite";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DeleteEvent, getTicketInfo, getTicketSails } from "../../lib/appwrite";

const ManageEvent = () => {
  const { id, title, description, image, date } = useLocalSearchParams();
  const { data } = useAppwrite(getTicketSails(id));
  const { data: ticketInfo, isLoading } = useAppwrite(getTicketInfo(id));

  const [totalSails, setTotalSails] = useState(0);
  const [totalRev, setTotalRev] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalSails(data.length);
      const totalPrice = data.reduce((acc, ticket) => acc + ticket.price, 0);
      setTotalRev(totalPrice);
    }
  }, [data]);

  const handleDelete = async () => {
    if (data.length > 0) {
      Alert.alert("you have already sold tickets for this event");
      return;
    }
    try {
      await DeleteEvent(id);
      router.replace("profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <ScrollView contentContainerStyle={{ padding: 5, flexGrow: 1 }}>
        <View className="flex-row items-center justify-between p-3">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" size={24} />
            </TouchableOpacity>
            <View>
              <Text className="text-xl">{title}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-bin-outline" size={24} />
          </TouchableOpacity>
        </View>
        <View className="bg-lime-400 p-4 rounded-lg ">
          <Text className="px-2 py-3 bg-white self-start rounded-lg">
            {new Date() == new Date(date)
              ? `today - `
              : new Date() < new Date(date)
              ? "upcoming - "
              : "ended - "}
            {new Date(date).toLocaleString()}
          </Text>
          <View className="gap-2 self-start flex-row mt-3">
            <Text className="px-2 py-3 bg-white self-start rounded-lg">
              Tickets Sold: {totalSails}
            </Text>
            <Text className="px-2 py-3 bg-white self-start rounded-lg">
              Earnings: {totalRev}.Rs
            </Text>
          </View>
        </View>
        <View className="p-1">
          <Text className="font-bold text-lg">Description</Text>
          <Text>{description}</Text>
        </View>
        <View>
          <Text className="text-lg pl-1 pb-2 font-bold">Prices</Text>
          {isLoading ? (
            <View></View>
          ) : (
            <View className="gap-3">
              {ticketInfo?.prices?.map((price, i) => (
                <View
                  key={i}
                  className="flex-row justify-between bg-lime-200 h-16 items-center p-2 rounded-lg"
                >
                  <View>
                    <Text className="capitalize font-bold text-lg">
                      {ticketInfo?.price_titles[i]}
                    </Text>
                    <Text>
                      {ticketInfo?.ticket_count[i] <= 0
                        ? "Sold out"
                        : "Avaiable"}{" "}
                      - {ticketInfo?.ticket_count[i]}{" "}
                    </Text>
                  </View>
                  <Text className="capitalize font-bold text-lg" key={i}>
                    {price}.Rs
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View className="mt-3 gap-2">
          <Text className="text-lg font-bold">Banner</Text>
          <Image source={{ uri: image }} className="w-full h-[500px]" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ManageEvent;
