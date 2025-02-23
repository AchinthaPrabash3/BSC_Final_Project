import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import useAppwrite from "../hooks/useAppwrite";
import { getOrders } from "../lib/appwrite";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ProductCardProfile = ({
  title,
  description,
  $id,
  content,
  rating,
  prices,
  price_desc,
  creator: { avatar, username, user_rating, $id: creatorId },
}) => {
  const { data } = useAppwrite(getOrders($id));
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    data.map((item) => {
      if (item.canceled == false) {
        setOrders((prev) => prev + 1);
      }
    });
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      className="p-2 w-full bg-lime-200 h-[140px] flex-row gap-4 items-center rounded-lg"
    >
      <Image
        source={{ uri: content }}
        className="size-[110px] rounded-md"
        resizeMode="cover"
      />
      <View className="flex-1 h-full justify-between">
        <View>
          <Text numberOfLines={2} className="text-2xl font-bold leading-none">
            {title}
          </Text>
          <Text numberOfLines={3} className="text-xs mt-1">
            {description}
          </Text>
        </View>
        <View className="mt-3 flex-row w-full justify-between items-center">
          <Text className="font-bold  capitalize">orders : {orders}</Text>
          <TouchableOpacity
            className="flex-row gap-2 items-center"
            onPress={() =>
              router.push({
                pathname: "(manage)/manageGig",
                params: {
                  id: $id,
                  title: title,
                  description: description,
                  image: content,
                  rating: rating,
                  activeOrders: orders,
                },
              })
            }
          >
            <Text className="text-xs capitalize font-medium">manage</Text>
            <AntDesign name="rightcircleo" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ProductCardProfile;
