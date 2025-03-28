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
  getUserInfo,
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
import Colapsable from "../../components/Colapsable";

const Profile = () => {
  const { setIsLoggedIn, setUser, user } = useGlobalContext();
  const {
    data: gigData,
    reFeatch: refetchGigs,
    isLoading: loadingPosts,
  } = useAppwrite(getUserPosts(user.$id));
  const {
    data: eventData,
    reFeatch: refetchEvents,
    isLoading: loadingEvents,
  } = useAppwrite(getUserEvents(user.$id));
  const {
    data: baughtGigs,
    reFeatch: refetchBoughtGigs,
    isLoading: loadingBooked,
  } = useAppwrite(getUserBookedGigs(user.$id));
  const {
    data: tickets,
    reFeatch: reFeatchTickets,
    isLoading: loadingTickets,
  } = useAppwrite(getUserBoughtTickets(user.$id));
  const {
    data: userInfo,
    reFeatch: refreshUinfo,
    isLoading: loadingUsers,
  } = useAppwrite(getUserInfo(user.$id));

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
      await refreshUinfo();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView className="h-screen p-2">
      {loadingUsers ? (
        <View></View>
      ) : (
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
              <View className="gap-4 items-center justify-between w-full absolute flex-row p-2 pt-4">
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "(settings)/settings",
                      params: {
                        id: user.$id,
                      },
                    })
                  }
                >
                  <Ionicons name="settings-outline" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsLoggedIn(false);
                    setUser(null);
                    signOut();
                    router.replace("(auth)");
                  }}
                >
                  <Ionicons name="log-out-outline" size={24} />
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={{ uri: userInfo?.avatar }}
              className="size-[100px] mx-auto mt-5 rounded-full bg-white"
              resizeMode="contain"
            />
            <View className="px-1">
              <Text className="text-xl font-bold text-center">
                {userInfo?.username}
              </Text>
              <Text className="w-[300px] mx-auto text-center mt-3 ">
                {userInfo.bio}
              </Text>
            </View>
            <View className="border-b border-slate-500 flex-row w-full mt-5 gap-3 px-3 pb-3">
              {tabData.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setTab(i)}
                  className={`flex-1 py-3 bg-lime-400s rounded-xl ${
                    i === tab ? "bg-lime-400" : "bg-slate-200"
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
                    className="h-[80px] w-full flex-row items-center justify-center gap-3 border-2 border-dashed border-slate-600 rounded-xl bg-white"
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
                    className="h-[80px] w-full flex-row items-center justify-center gap-3 border-2 border-dashed border-slate-600 rounded-xl bg-white"
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
                  <Colapsable title={" Orderd services and products"}>
                    <View className="gap-3  pb-2">
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
                  </Colapsable>

                  <Colapsable title={" Bought Tickets"}>
                    <View className="gap-3  mb-2 pb-2">
                      {tickets?.map((ticket, i) => {
                        if (
                          ticket?.eventId?.eventname !== null &&
                          !(new Date() > new Date(ticket?.eventId?.date)) &&
                          !ticket?.canceled
                        ) {
                          return (
                            <BaughtTickets
                              key={i}
                              {...ticket}
                              ticketId={ticket.$id}
                            />
                          );
                        }
                      })}
                    </View>
                  </Colapsable>
                </View>
              ) : (
                ""
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default Profile;
