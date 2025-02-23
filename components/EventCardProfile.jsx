import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const EventCardProfile = ({
  $id,
  eventname,
  date,
  prices,
  location,
  ticketCount,
  banner,
  event_desc,
}) => {
  return (
    <View className="flex-row bg-lime-200 gap-3 h-[180px] items-center p-3">
      <Image
        source={{ uri: banner }}
        className="w-[100px] h-[150px] "
        resizeMode="cover"
      />
      <View className="flex-1 h-full justify-between">
        <View>
          <Text className="text-2xl capitalize">{eventname}</Text>
          <Text numberOfLines={3}>{event_desc}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text>sold tickets</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "(manage)/manageEvent",
                params: {
                  id: $id,
                  title: eventname,
                  description: event_desc,
                  image: banner,
                  date: date,
                },
              })
            }
          >
            <AntDesign name="rightcircleo" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EventCardProfile;
