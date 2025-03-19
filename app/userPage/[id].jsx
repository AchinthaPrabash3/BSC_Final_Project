import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../hooks/useAppwrite";
import { getUserInfo, getUserPosts } from "../../lib/appwrite";
import ProductCard from "../../components/ProductCard";
const Id = () => {
  const { id } = useLocalSearchParams();
  const { data } = useAppwrite(getUserInfo(id));
  const { data: UserGigs } = useAppwrite(getUserPosts(id));
  const { username, avatar } = data;

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>
        <View className="p-3">
          <View className="items-center justify-center pt-3">
            <Image
              source={{ uri: avatar }}
              className="size-24 rounded-full"
              resizeMode="contain"
            />
            <Text className="pt-3">{username}</Text>
          </View>
          <View>
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
