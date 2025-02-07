import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventCard from "../../components/EventCard";
import useAppwrite from "../../hooks/useAppwrite";
import { getAllEvents } from "../../lib/appwrite";
import SearchInput from "../../components/SearchInput";
const Events = () => {
  const { data } = useAppwrite(getAllEvents());

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
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Events;
