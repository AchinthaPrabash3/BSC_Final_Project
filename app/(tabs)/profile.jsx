import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Link, router } from "expo-router";
import { getUserEvents, getUserPosts, signOut } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import useAppwrite from "../../hooks/useAppwrite";
import ProductCard from "../../components/ProductCard";
import EventCard from "../../components/EventCard";
const Profile = () => {
  const { setIsLoggedIn, setUser, user } = useGlobalContext();

  const { data: gigData } = useAppwrite(getUserPosts(user.$id));
  const { data: eventData } = useAppwrite(getUserEvents(user.$id));

  const tabData = ["Gigs", "Events", "bought"];
  const [tab, setTab] = useState(0);

  return (
    <SafeAreaView className="h-screen">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="relative"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View>
          <View className="relative items-center justify-center flex-row flex-1">
            <Text className="text-xl font-bold">{user.username}</Text>
            <View className="gap-4 items-center justify-end  absolute right-1 flex-row">
              <TouchableOpacity className=" right-3">
                <Ionicons name="settings-outline" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsLoggedIn(false);
                  setUser(null);
                  signOut();
                  router.replace("(auth)");
                }}
                className=" right-3"
              >
                <Ionicons name="log-out-outline" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={{ uri: user.avatar }}
            className="size-[100px] mx-auto mt-5 rounded-full bg-white"
            resizeMode="contain"
          />
          <View className="border-b border-slate-500 flex-row w-full mt-5 gap-3 px-3 pb-3">
            {tabData.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setTab(i)}
                className={`flex-1 py-3 bg-lime-400s rounded-xl ${
                  i === tab ? "bg-lime-400" : "bg-white"
                } `}
              >
                <Text className="text-center">{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="p-2 gap-3">
            {tab == 0 ? (
              <View>
                <TouchableOpacity
                  className="h-[100px] w-full flex-row items-center justify-center gap-3 border-2 border-dashed border-second rounded-xl bg-white"
                  onPress={() => router.push("create")}
                >
                  <Text className="capitalize font-bold">create a gig</Text>
                  <Ionicons name="create-outline" size={24} />
                </TouchableOpacity>
                {gigData.map((items, i) => (
                  <ProductCard key={i} {...items} />
                ))}
              </View>
            ) : tab == 1 ? (
              <View>
                <TouchableOpacity
                  className="h-[100px] w-full flex-row items-center justify-center gap-3 border-2 border-dashed border-second rounded-xl bg-white mb-5"
                  onPress={() => router.push("create")}
                >
                  <Text className="capitalize font-bold">create a event</Text>
                  <Ionicons name="create-outline" size={24} />
                </TouchableOpacity>
                <View className="gap-3">
                  {eventData.map((items, i) => (
                    <EventCard {...items} key={i} />
                  ))}
                </View>
              </View>
            ) : tab == 2 ? (
              ""
            ) : (
              ""
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Profile;
