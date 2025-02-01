import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarComp from "../../components/CalenderComp";
import { toDateId } from "@marceloterreiro/flash-calendar";
import CustomBtn from "../../components/CustomBtn";
import { useGlobalContext } from "../../context/GlobalProvider";
const ProductPage = () => {
  const {
    title,
    id,
    description,
    image,
    price,
    priceD,
    userName,
    userRating,
    avatar,
    rating,
  } = useLocalSearchParams();

  const today = toDateId(new Date());
  const [selectDate, setSelectDate] = useState(today);

  const [order, setOrder] = useState({
    date: [],
    price: "",
    userId: "",
    gigId: id,
  });

  return (
    <SafeAreaView className="h-screen">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        className="p-2"
      >
        <View className="p-2">
          <View className="flex-row items-center justify-between gap-4 mb-5">
            <TouchableOpacity
              onPress={() => router.back()}
              className="size-12 bg-slate-200 items-center justify-center pr-1 rounded-full"
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back-outline" size={32} color="black" />
            </TouchableOpacity>
            <View className="flex-row-reverse items-center gap-3 my-3">
              <Image
                source={{ uri: avatar }}
                className="size-12 rounded-full"
              />
              <View>
                <Text className="font-bold text-xl">{userName}</Text>
                <View className="flex-row">
                  {[...Array(5)].map((_, index) => (
                    <AntDesign
                      size={14}
                      key={index}
                      name="star"
                      color={index < rating ? "#FAD5A5" : "#808080"}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
          <Image
            source={{ uri: image }}
            className="w-full h-[250px] rounded-lg"
            resizeMode="cover"
          />
          <View className="gap-1 my-4">
            <Text className="text-2xl">{title}</Text>
            <View className="flex-row">
              {[...Array(5)].map((_, index) => (
                <AntDesign
                  size={12}
                  key={index}
                  name="star"
                  color={index < rating ? "#FAD5A5" : "#808080"}
                />
              ))}
            </View>
          </View>

          <Text className=" text-lg" style={{ textAlign: "justify" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque,
            nobis voluptates nulla dolores excepturi laudantium fugit possimus
            voluptatum animi sit quibusdam eos obcaecati rem quos quasi atque.
            Consequuntur, nihil quidem!
          </Text>

          <ScrollView horizontal className="my-4">
            {JSON.parse(price).map((item, i) => (
              <View key={i} className="size-[150px] bg-white ml-2 p-5">
                <Text>{JSON.parse(priceD)[i]}</Text>
                <Text>{item}</Text>
                <TouchableOpacity>
                  <Text>select</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <CalendarComp
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            today={today}
          />
          <CustomBtn
            title={"book now"}
            textStyles={"capitalize font-bold text-2xl"}
            containerStyles={"h-16 w-full bg-second"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductPage;
