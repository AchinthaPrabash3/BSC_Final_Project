import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
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

const ManageGig = () => {
  const { id, title, description, image, rating, activeOrders } =
    useLocalSearchParams();
  const { data } = useAppwrite(getOrders(id));
  const [isDeleteing, setIsDeleting] = useState(false);

  const deletingGig = async () => {
    if (activeOrders > 0) {
      Alert.alert("complete all the orders or cancel the orders");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteGig(id);
      router.replace("profile");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
        <View className="flex-row items-center justify-between  py-3 gap-3">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
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
        <Image
          source={{ uri: image }}
          className="w-full h-[200px] rounded-xl"
          resizeMode="cover"
        />
        <View className="w-full items-center justify-end p-2 flex-row gap-2">
          <AntDesign name="edit" size={24} />
        </View>
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
