import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../hooks/useAppwrite";
import { searchEvents } from "../../lib/appwrite";
import EventCard from "../../components/EventCard";
import EventSearch from "../../components/EventSearch";

const Query = () => {
  const { query } = useLocalSearchParams();
  console.log("Query param:", query);

  const { data, reFeatch } = useAppwrite(searchEvents(query));

  useEffect(() => {
    if (query) {
      console.log("Fetching events for query:", query);
      reFeatch();
    }
  }, [query]);

  console.log("Fetched data:", data);

  return (
    <SafeAreaView className="p-1 h-screen">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <EventCard {...item} />}
        ListHeaderComponent={
          <View>
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center"
            >
              <Ionicons name="chevron-back-outline" size={24} />
              <Text>Back</Text>
            </TouchableOpacity>
            <EventSearch />
          </View>
        }
        ListEmptyComponent={
          <Text className="text-center text-gray-400 text-xl mt-5 capitalize">
            No events found
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Query;
