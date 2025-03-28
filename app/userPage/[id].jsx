import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../hooks/useAppwrite";
import { getUserInfo, getUserPosts } from "../../lib/appwrite";
import ProductCard from "../../components/ProductCard";
const Id = () => {
  const { id } = useLocalSearchParams();
  const { data, reFeatch } = useAppwrite(getUserInfo(id));
  const { data: UserGigs } = useAppwrite(getUserPosts(id));
  const { username, avatar, bio } = data;
  const [refresing, setRefresing] = useState(false);
  const refresh = async () => {
    setRefresing(true);
    try {
      await reFeatch();
    } catch (error) {
      console.error(error);
    } finally {
      setRefresing(false);
    }
  };

  return (
    <SafeAreaView className="p-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl onRefresh={refresh} refreshing={refresing} />
        }
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={32} />
        </TouchableOpacity>
        <View className="p-3">
          <View className="items-center justify-center pt-3 mb-4 border-b pb-3 border-lime-400">
            <View
              style={{
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              }}
            >
              <Image
                source={{ uri: avatar }}
                className="size-28 rounded-full"
                resizeMode="contain"
              />
            </View>
            <Text className="pt-1 text-lg font-bold">{username}</Text>
            <Text className="w-[250px] text-center text-sm mt-2">{bio}</Text>
          </View>
          <View className="-mt-3">
            {UserGigs.map((data, i) => (
              <ProductCard {...data} key={i} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Id;
