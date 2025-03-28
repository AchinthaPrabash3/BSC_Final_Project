import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../components/EventCard";
import useAppwrite from "../../hooks/useAppwrite";
import { getAllEvents } from "../../lib/appwrite";
import EventSearch from "../../components/EventSearch";

const Events = () => {
  const { data, reFeatch } = useAppwrite(getAllEvents());
  const [isRefressing, setIsRefressing] = useState(false);

  const onRefresh = async () => {
    setIsRefressing(true);
    try {
      await reFeatch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefressing(false);
    }
  };

  return (
    <SafeAreaView className="h-screen p-4 bg-gray-100">
      <FlatList
        showsVerticalScrollIndicator={false}
        className="h-full"
        contentContainerStyle={{ paddingBottom: 100, gap: 20 }}
        data={data}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Find the Fun of Life
            </Text>
            <EventSearch />
          </View>
        )}
        ListEmptyComponent={
          <View className="h-screen items-center justify-center">
            <Text className="text-2xl text-gray-300">Loading Data</Text>
          </View>
        }
        renderItem={({ item }) => <EventCard {...item} key={item.$id} />}
        refreshControl={
          <RefreshControl refreshing={isRefressing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Events;
