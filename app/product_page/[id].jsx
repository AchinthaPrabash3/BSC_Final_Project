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
import { buyGig, getGigInfo } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";

const ProductPage = () => {
  const { id } = useLocalSearchParams();

  const today = toDateId(new Date());
  const [selectDate, setSelectDate] = useState(today);

  const { data } = useAppwrite(getGigInfo(id));
  const {
    title,
    description,
    content,
    prices,
    price_desc,
    creator,
    rating,
    price_titles,
    contactNum,
  } = data;

  const { user } = useGlobalContext();
  const [select, setSelct] = useState(null);
  const [order, setOrder] = useState({
    date: "",
    price: 0,
    buyerId: user.$id,
    gigId: id,
    canceled: false,
    completed: false,
    securityCode: Math.floor(1000 + Math.random() * 9000),
  });
  const [placing, setPlacing] = useState(false);

  const placeOreder = async () => {
    if (!order.date) {
      Alert.alert("Please select a date");
      return;
    }
    if (!order.price) {
      Alert.alert("Please select a package");
      return;
    }
    setPlacing(true);
    try {
      await buyGig({ ...order });
      router.replace("/home");
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setPlacing(false);
    }
  };

  // Confirmation handler for "Book Now" button
  const handleBookNowPress = () => {
    Alert.alert(
      "Confirm Booking", // Title of the alert
      "Are you sure you want to book this gig?", // Message in the alert
      [
        {
          text: "Cancel", // First button (Cancel)
          onPress: () => console.log("Booking canceled"), // Action on cancel
          style: "cancel", // Style for cancel button
        },
        {
          text: "OK", // Second button (OK)
          onPress: () => {
            setOrder({
              ...order,
              securityCode: Math.floor(1000 + Math.random() * 9000),
            });
            placeOreder(); // Call the placeOreder function
          },
        },
      ],
      { cancelable: false } // Prevent dismissing the alert by tapping outside
    );
  };

  return (
    <SafeAreaView className="h-screen">
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
          <Text>On : {order.date || "Select date"}</Text>
        </View>
      ) : (
        ""
      )}
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
                source={{ uri: creator?.avatar }}
                className="size-12 rounded-full"
              />
              <View className="items-end">
                <Text className="font-bold text-xl">{creator?.username}</Text>

                {/* <View className="flex-row">
                                    {[...Array(5)].map((_, index) => (
                                        <AntDesign
                                            size={14}
                                            key={index}
                                            name="star"
                                            color={index < rating ? "#FAD5A5" : "#808080"}
                                        />
                                    ))}
                                </View> */}
              </View>
            </View>
          </View>
          <Image
            source={{ uri: content }}
            className="w-full h-[250px] rounded-lg"
            resizeMode="cover"
          />
          <View className="gap-1 my-4">
            <Text className="text-2xl">{data?.title}</Text>
            <Text>Contact Num - {contactNum}</Text>
            <View className="flex-row">
              {[...Array(5)].map((_, index) => (
                <AntDesign
                  size={12}
                  key={index}
                  name="star"
                  color={index < Math.round(rating) ? "#FAD5A5" : "#808080"}
                />
              ))}
            </View>
          </View>

          <Text className="text-sm" style={{ textAlign: "justify" }}>
            {description}
          </Text>

          <ScrollView horizontal className="my-4">
            {prices?.map((item, i) => (
              <View
                key={i}
                className={`size-[300px] ${
                  select == i ? "bg-lime-400" : "bg-white"
                }  ml-2 p-3 rounded-md justify-between items-center`}
              >
                <View className="p-2">
                  <Text className={`font-bold text-center text-xl`}>
                    {data?.price_titles[i]}
                  </Text>
                  <Text className="text-center mt-4 text-xl font-semibold ">
                    {item}.Rs
                  </Text>
                  <Text className="text-justify font-light mt-4">
                    {data?.price_desc[i]}
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
                  <Text>Select</Text>
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

          <CustomBtn
            loading={placing}
            handlePress={handleBookNowPress} // Use the new confirmation handler
            title={"Book Now"}
            textStyles={"capitalize font-bold text-2xl"}
            containerStyles={"h-16 w-full bg-lime-400 rounded-lg"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductPage;
