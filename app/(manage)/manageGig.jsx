import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../hooks/useAppwrite";
import { cancelGigOrders, deleteGig, getOrders } from "../../lib/appwrite";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import GigStats from "../../components/GigStats";

const ManageGig = () => {
  const { id, title, description, image, rating, activeOrders } =
    useLocalSearchParams();
  const { data, reFeatch } = useAppwrite(getOrders(id));
  const [isDeleteing, setIsDeleting] = useState(false);
  const [orders, setOrders] = useState(0);
  const [isRefresing, setIsRefresing] = useState(false);

  const onRefresh = async () => {
    setIsRefresing(true);
    try {
      await reFeatch();
      setIsRefresing(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setOrders(0);

    const totalOrders = data.reduce((acc, item) => {
      if (item.canceled == false && item.completed == false) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setOrders(totalOrders);
  }, [data]);

  const deletingGig = async () => {
    if (orders > 0) {
      Alert.alert("complete all the orders or cancel the orders");
      return;
    }

    Alert.alert(
      "Delete Gig",
      "by this you will be deleting the gig and no loger will be able to reseve orders",
      [
        {
          text: "cancel",
          style: "cancel",
        },
        {
          text: "ok",
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteGig(id);
              router.replace("profile");
            } catch (error) {
              console.error(error);
            } finally {
              setIsDeleting(false);
              router.back();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView className="h-screen">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 10 }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isRefresing} />
        }
      >
        <View className="flex-row items-center justify-between  py-3 gap-3">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" size={32} />
            </TouchableOpacity>
            <View>
              <Text>{title}</Text>
              <View className="flex-row">
                {[...Array(5)].map((_, index) => (
                  <AntDesign
                    size={10}
                    key={index}
                    name="star"
                    color={index < rating ? "#FAD5A5" : "#808080"}
                  />
                ))}
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => deletingGig()}>
            <MaterialCommunityIcons name="delete-outline" size={24} />
          </TouchableOpacity>
        </View>
        <View className="mb-5">
          <GigStats activeOrders={orders} id={id} />
        </View>
        <Image
          source={{ uri: image }}
          className="w-full h-[200px] rounded-xl"
          resizeMode="cover"
        />
        <TouchableOpacity
          className="w-full items-center justify-end p-2 flex-row gap-2"
          onPress={() =>
            router.push({
              pathname: "editGig",
              params: {
                id,
              },
            })
          }
        >
          <Text>Edit Gig</Text>
          <AntDesign name="edit" size={24} />
        </TouchableOpacity>

        <View className="gap-3">
          {data.map(
            (
              {
                $id,
                price,
                canceled,
                completed,
                securityCode,
                gigId,
                date,
                buyerId,
              },
              i
            ) => {
              const dateFormat = new Date(date).toLocaleDateString();
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  disabled={canceled || completed}
                  onPress={() =>
                    router.push({
                      pathname: "/order",
                      params: {
                        $id,
                        price,
                        canceled,
                        completed,
                        securityCode,
                        gigId,
                        date,
                        buyerId,
                      },
                    })
                  }
                  key={i}
                  className=" rounded-lg flex-row items-center justify-between py-5  bg-lime-200 px-4"
                >
                  <View>
                    <Text>
                      {canceled ? "canceled" : completed ? "completed" : "live"}
                    </Text>
                    <Text className="text-xl font-bold">{price}.Rs</Text>
                  </View>
                  <View className=" items-end">
                    <Text className="text-xl font-bold">
                      {buyerId.username}
                    </Text>
                    <Text>{dateFormat}</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ManageGig;
