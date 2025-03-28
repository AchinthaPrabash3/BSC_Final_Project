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
  gig_type,
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
      className="mt-[17px] items-start justify-center gap-3 bg-white p-2 py-5 rounded-xl border border-slate-200"
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
          <View className="flex-row-reverse justify-between">
            <View className="flex-row items-end gap-1">
              <Text className="items-end text-sm" numberOfLines={2}>
                {prices.length > 1 ? "Starting from" : "price"}{" "}
              </Text>
              <Text className="font-bold text-lg leading-none">
                {prices[0]}.Rs
              </Text>
            </View>
            <View className="flex-row gap-[0.5px]">
              {[...Array(5)].map((_, index) => (
                <AntDesign
                  size={16}
                  key={index}
                  name="star"
                  color={index < Math.round(rating) ? "#FAD5A5" : "#808080"}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity onPress={passData}>
            <Text className="text-2xl font-bold" numberOfLines={2}>
              {title}
            </Text>
          </TouchableOpacity>
          <View className="flex-row gap-1 mt-2 flex-wrap">
            {gig_type?.map((data, i) => (
              <Text
                key={i}
                className="text-slate-500 bg-slate-200 px-1 py-1 rounded-md text-sm"
              >
                {data}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductCard;
