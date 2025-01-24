import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";
import { eventProducts } from "../../constants/dummyData";

const Home = () => {
  const { setIsLoggedIn, setUser, user } = useGlobalContext();
  return (
    <SafeAreaView className="h-screen p-4">
      <FlatList
        className="h-full"
        data={eventProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard {...item} key={item.id} />}
        ListHeaderComponent={() => (
          <View className="mb-5">
            <View className="flex-row items-center justify-between">
              <View>
                <Text>welcome back</Text>
                <Text>{user.username}</Text>
              </View>
              <View className="size-10 bg-slate-300 rounded-full"></View>
            </View>
            <SearchInput />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
