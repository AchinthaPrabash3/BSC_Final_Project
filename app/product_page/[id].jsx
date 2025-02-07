import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarComp from "../../components/CalenderComp";
import { toDateId } from "@marceloterreiro/flash-calendar";
import CustomBtn from "../../components/CustomBtn";
import { useGlobalContext } from "../../context/GlobalProvider";
import { buyGig } from "../../lib/appwrite";

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

  const { user } = useGlobalContext();
  const [select, setSelct] = useState(null);
  const [order, setOrder] = useState({
    date: "",
    price: 0,
    buyerId: user.$id,
    gigId: id,
  });
  const [placing, setPlacing] = useState(false);

  const placeOrder = async () => {
    if (!order.date || !order.price) {
      Alert.alert("please select a order");
      return;
    }
    setPlacing(true);
    try {
      await buyGig({ ...order });
      router.replace(`home`);
    } catch (error) {
      console.error(error);
    } finally {
      setPlacing(false);
    }
  };

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

          <Text className="text-sm" style={{ textAlign: "justify" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque,
            nobis voluptates nulla dolores excepturi laudantium fugit possimus
            voluptatum animi sit quibusdam eos obcaecati rem quos quasi atque.
            Consequuntur, nihil quidem!
          </Text>

          <ScrollView horizontal className="my-4">
            {JSON.parse(price).map((item, i) => (
              <View
                key={i}
                className={`size-[200px] ${
                  select == i ? "bg-lime-400" : "bg-white"
                }  ml-2 p-3 rounded-md justify-between items-center`}
              >
                <View className="p-2">
                  <Text className="text-justify font-light">
                    {JSON.parse(priceD)[i]}
                  </Text>
                  <Text className="text-center mt-4 text-xl font-semibold ">
                    {item}.Rs
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelct(i);
                    setOrder({ ...order, price: Number(item) });
                  }}
                  className={`${
                    select == i ? "bg-white" : "bg-lime-400"
                  } py-4  w-full items-center justify-center rounded-md`}
                >
                  <Text>select</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <CalendarComp
            getDate={setOrder}
            order={order}
            gigId={id}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            today={today}
          />
          {select !== null ? (
            <View
              className=" bg-white rounded-xl mb-4 p-3 flex-row justify-between"
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <Text>Total : {order.price}.Rs</Text>
              <Text>On : {order.date || "select date"}</Text>
            </View>
          ) : (
            ""
          )}
          <CustomBtn
            loading={placing}
            handlePress={placeOrder}
            title={"book now"}
            textStyles={"capitalize font-bold text-2xl"}
            containerStyles={"h-16 w-full bg-lime-400 rounded-lg"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductPage;
