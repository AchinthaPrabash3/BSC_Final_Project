import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

const ProductCard = ({ title, description, id, image }) => {
  return (
    <View className="flex-row mt-[17px] items-start justify-center gap-3 w">
      <TouchableOpacity
        className="h-[150px] w-[150px] bg-slate-300 rounded-lg"
        onPress={() =>
          router.push({
            pathname: "/product_page/[id]",
            params: {
              title: title,
              id: id,
              description: description,
              image: image,
            },
          })
        }
      >
        <Image source={image} className="size-full" resizeMode="contain" />
      </TouchableOpacity>
      <View className="flex-1">
        <View className="h-10 bg-slate-200 items-center gap-3 justify-start flex-row">
          <Image source={""} className="size-9 rounded-full bg-amber-300" />
          <View>
            <Text className="text-xs font-semibold">username</Text>
            <Text className="text-[10px] font-thin">rating</Text>
          </View>
        </View>
        <View className="mt-3 justify-between grow">
          <View>
            <Text>{title}</Text>
          </View>
          <View className="flex-row mt-2 gap-2">
            <TouchableOpacity className="rounded-xl h-12 bg-slate-300 items-center justify-center grow">
              <Text>buy</Text>
            </TouchableOpacity>
            <TouchableOpacity className="rounded-xl size-12 items-center justify-center bg-slate-500 ">
              <Ionicons name="heart" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductCard;
