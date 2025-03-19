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
  price_titles,
  creator: { avatar, username, user_rating, $id: creatorId },
}) => {
  const passData = () =>
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
        price_titles: JSON.stringify(price_titles),
      },
    });

  return (
    <View
      className="mt-[17px] items-start justify-center gap-3 bg-white p-2 py-5 rounded-xl"
      style={{
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      }}
    >
      <View className="flex-row gap-3 items-center justify-between w-full">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "userPage/[id]",
                params: {
                  id: creatorId,
                },
              })
            }
          >
            <Image source={{ uri: avatar }} className="size-10 rounded-full" />
          </TouchableOpacity>
          <Text className=" capitalize">{username}</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} />
        </TouchableOpacity>
      </View>
      <View className="w-full h-[230px]">
        <TouchableOpacity
          className="size-full"
          onPress={passData}
          activeOpacity={1}
        >
          <Image
            source={{ uri: content }}
            className="size-full rounded-lg"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 w-full">
        <View className="">
          <TouchableOpacity onPress={passData}>
            <Text className="text-3xl">{title}</Text>
          </TouchableOpacity>
          <View className="flex-row gap-0.5">
            {[...Array(5)].map((_, index) => (
              <AntDesign
                size={16}
                key={index}
                name="star"
                color={index < Math.round(rating) ? "#FAD5A5" : "#808080"}
              />
            ))}
          </View>
          <Text className="text-lg mt-2">
            {prices.length > 1 ? "Starting from" : "price"} {prices[0]}.Rs
          </Text>
        </View>
        {/* <View className="flex-row mt-2 gap-2">
          <TouchableOpacity
            className="rounded-xl h-16 bg-lime-400 items-center justify-center grow flex-row"
            onPress={passData}
            style={{
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
          >
            <Text className="capitalize text-xl font-bold ">book</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
            className="rounded-xl size-16 items-center justify-center bg-slate-50"
            onPress={() => setColor(!color)}
          >
            <Ionicons name="heart" size={24} color={color ? "red" : "gray"} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductCard;
