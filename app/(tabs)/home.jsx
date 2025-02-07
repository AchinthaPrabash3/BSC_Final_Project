import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
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
  const [selected, setSelected] = useState(0);
  return (
    <SafeAreaView
      className={`h-screen ${Platform.OS == "ios" ? "p-2" : "p-4"} `}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        className="h-full flex-1"
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <ProductCard {...item} key={item.id} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        bottom
        ListHeaderComponent={() => (
          <View className="pt-4">
            <View className="flex-row items-center justify-between">
              <View className="pl-2">
                <Text className="text-base font-light -mb-1">welcome back</Text>
                <Text className="text-2xl font-semibold">{user.username}</Text>
              </View>
              <View className="size-10 bg-lime-400 rounded-full"></View>
            </View>
            <SearchInput />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="mt-5"
            >
              {[...Array(10)].map((_, index) => (
                <TouchableOpacity
                  onPress={() => setSelected(index)}
                  key={index}
                  className={`h-16 w-28 ${
                    selected == index ? "bg-lime-400" : "bg-slate-50"
                  } ml-4 rounded-lg`}
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
