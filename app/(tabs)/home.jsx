import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getAllGigs } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";
import useAppwrite from "../../hooks/useAppwrite";

const Home = () => {
  const { user } = useGlobalContext();
  const { data } = useAppwrite(getAllGigs());

  return (
    <SafeAreaView className="h-screen  p-2 bg-main">
      <FlatList
        showsVerticalScrollIndicator={false}
        className="h-full flex-1"
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <ProductCard {...item} key={item.id} />}
        ListHeaderComponent={() => (
          <View className="mb-5">
            <View className="flex-row items-center justify-between">
              <View className="">
                <Text className="text-base font-light -mb-1">welcome back</Text>
                <Text className="text-2xl font-semibold">{user.username}</Text>
              </View>
              <View className="size-10 bg-third rounded-full"></View>
            </View>
            <SearchInput />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="mt-5"
            >
              {[...Array(10)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  className="h-16 w-28 bg-slate-200 ml-4 rounded-lg"
                ></TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
