import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

const ProductCard = ({
  title,
  description,
  $id,
  content,
  rating,
  prices,
  price_desc,
  creator: { avatar, username, user_rating, $id: creatorId },
}) => {
  const [color, setColor] = useState(false);

  return (
    <View className="mt-[17px] items-start justify-center gap-3 bg-white p-2 py-5 rounded-xl ">
      <View className="flex-row gap-3 items-center justify-between w-full">
        <View className="flex-row items-center gap-3">
          <Image source={{ uri: avatar }} className="size-14 rounded-full" />
          <Text className=" capitalize text-xl">{username}</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} />
        </TouchableOpacity>
      </View>
      <View className="w-full h-[230px]">
        <Image
          source={{ uri: content }}
          className="size-full rounded-lg"
          resizeMode="cover"
        />
      </View>
      <View className="flex-1 w-full">
        <View className="">
          <Text className="text-3xl">{title}</Text>
          <View className="flex-row gap-0.5">
            {[...Array(5)].map((_, index) => (
              <AntDesign
                size={16}
                key={index}
                name="star"
                color={index < rating ? "#FAD5A5" : "#808080"}
              />
            ))}
          </View>
          <Text className="text-lg mt-2">
            {prices.length > 0 ? "Starting from" : "price"} {prices[0]}.Rs
          </Text>
        </View>
        <View className="flex-row mt-2 gap-2">
          <TouchableOpacity
            className="rounded-xl h-16 bg-second items-center justify-center grow flex-row"
            onPress={() =>
              router.push({
                pathname: "/product_page/[id]",
                params: {
                  title: title,
                  id: $id,
                  description: description,
                  image: content,
                  price: JSON.stringify(prices),
                  priceD: JSON.stringify(price_desc),
                  rating: rating,
                  userName: username,
                  avatar: avatar,
                  userRating: user_rating,
                  creatorId: creatorId,
                },
              })
            }
          >
            <Text className="capitalize text-2xl">book</Text>
            <AntDesign name="book" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl size-16 items-center justify-center bg-third "
            onPress={() => setColor(!color)}
          >
            <Ionicons name="heart" size={24} color={color ? "red" : "blue"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductCard;
