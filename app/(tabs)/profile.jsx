import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import {
  getUserBookedGigs,
  getUserBoughtTickets,
  getUserEvents,
  getUserPosts,
  signOut,
} from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useAppwrite from "../../hooks/useAppwrite";
import ProductCardProfile from "../../components/ProductCardProfile";
import EventCardProfile from "../../components/EventCardProfile";
import ProfileStats from "../../components/ProfileStats";
import BaughtGigCard from "../../components/BaughtGigCard";
import BaughtTickets from "../../components/BaughtTickets";

const Profile = () => {
  const { setIsLoggedIn, setUser, user } = useGlobalContext();
  const { data: gigData, reFeatch: refetchGigs } = useAppwrite(
    getUserPosts(user.$id)
  );
  const { data: eventData, reFeatch: refetchEvents } = useAppwrite(
    getUserEvents(user.$id)
  );
  const { data: baughtGigs, reFeatch: refetchBoughtGigs } = useAppwrite(
    getUserBookedGigs(user.$id)
  );
  const { data: tickets, reFeatch: reFeatchTickets } = useAppwrite(
    getUserBoughtTickets(user.$id)
  );

  const tabData = ["Gigs", "Events", "bought"];
  const [tab, setTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchGigs();
      await refetchEvents();
      await refetchBoughtGigs();
      await reFeatchTickets();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="relative"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#00ff00"]}
            tintColor={"#00ff00"}
          />
        }
      >
        <View>
          <View className="relative items-center justify-center flex-row flex-1 pb-3 pt-4">
            <View className="gap-4 items-center justify-end absolute right-1 flex-row">
              <TouchableOpacity className="right-3">
                <Ionicons name="settings-outline" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsLoggedIn(false);
                  setUser(null);
                  signOut();
                  router.replace("(auth)");
                }}
                className="right-3"
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
          <View className="px-1">
            <Text className="text-xl font-bold text-center">
              {user.username}
            </Text>
            {/* <ProfileStats
              gigData={gigData}
              eventData={eventData}
              baughtGigs={baughtGigs}
              tickets={tickets}
            /> */}
          </View>
          <View className="border-b border-slate-500 flex-row w-full mt-5 gap-3 px-3 pb-3">
            {tabData.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setTab(i)}
                className={`flex-1 py-3 bg-lime-400s rounded-xl ${
                  i === tab ? "bg-lime-400" : "bg-white"
                }`}
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
                  onPress={() => router.push("createGig")}
                >
                  <Text className="capitalize font-bold">create a gig</Text>
                  <Ionicons name="create-outline" size={24} />
                </TouchableOpacity>
                <Text className="mt-4 mb-1 pl-2 text-xl capitalize font-bold">
                  live gigs - {gigData.length}
                </Text>
                <View className="mt-3 gap-4">
                  {gigData?.map((items, i) => (
                    <ProductCardProfile {...items} key={i} />
                  ))}
                </View>
              </View>
            ) : tab == 1 ? (
              <View>
                <TouchableOpacity
                  className="h-[100px] w-full flex-row items-center justify-center gap-3 border-2 border-dashed border-second rounded-xl bg-white mb-5"
                  onPress={() => router.push("createEvent")}
                >
                  <Text className="capitalize font-bold">create a event</Text>
                  <Ionicons name="create-outline" size={24} />
                </TouchableOpacity>
                <View className="gap-3 mt-2">
                  {eventData?.map((items, i) => (
                    <EventCardProfile {...items} key={i} />
                  ))}
                </View>
              </View>
            ) : tab == 2 ? (
              <View>
                <Text className="font-bold py-3 border-b mb-3">
                  Orderd services and products
                </Text>

                <View className="gap-3 border-b pb-2">
                  {baughtGigs?.map((item, i) => {
                    if (
                      item?.gigId !== null &&
                      !item?.rated &&
                      !item?.canceled
                    ) {
                      return <BaughtGigCard {...item} key={i} />;
                    }
                  })}
                </View>
                <Text className="font-bold py-3 border-b mb-3">
                  Bought Tickets
                </Text>
                <View className="gap-3 border-b mb-2 pb-2">
                  {tickets?.map((ticket, i) => {
                    if (ticket?.eventId?.eventname !== null) {
                      return <BaughtTickets key={i} {...ticket} />;
                    }
                  })}
                </View>
              </View>
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
