import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import index from "../app/(auth)";

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
  return (
    <View className="mt-[17px] items-start justify-center gap-3 w">
      <TouchableOpacity
        className="w-full h-[220px] rounded-lg"
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
              user: username,
              avatar: avatar,
              userRating: user_rating,
              creatorId: creatorId,
            },
          })
        }
      >
        <Image
          source={{ uri: content }}
          className="size-full rounded-lg"
          resizeMode="center"
          resizeMethod="resize"
        />
      </TouchableOpacity>
      <View className="flex-1">
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
          </View>{" "}
          <Text>{prices[0]}.Rs</Text>
        </View>
        <View className="flex-row mt-2 gap-2">
          <TouchableOpacity className="rounded-xl h-16 bg-slate-300 items-center justify-center grow flex-row">
            <Text className="capitalize text-2xl">book</Text>
            <AntDesign name="book" size={24} />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-xl size-16 items-center justify-center bg-slate-500 ">
            <Ionicons name="heart" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductCard;
