import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../components/EventCard";
import useAppwrite from "../../hooks/useAppwrite";
import { getAllEvents } from "../../lib/appwrite";
import SearchInput from "../../components/SearchInput";
const Events = () => {
  const { data, reFeatch } = useAppwrite(getAllEvents());

  const [isRefressing, setIsRefressing] = useState(false);
  const onRefresh = async () => {
    setIsRefressing(true);
    await reFeatch();
    setIsRefressing(false);
  };

  return (
    <SafeAreaView className="h-screen  p-3 ">
      <FlatList
        showsVerticalScrollIndicator={false}
        className="h-full flex-1s"
        contentContainerStyle={{ paddingBottom: 100, gap: 20 }}
        style={{ gap: 10 }}
        data={data}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View>
            <SearchInput />
          </View>
        )}
        renderItem={({ item }) => <EventCard {...item} key={item.id} />}
        refreshControl={
          <RefreshControl refreshing={isRefressing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Events;
