import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateFormInput from "../../components/CreateFormInput";
import * as ImagePicker from "expo-image-picker";
import { useGlobalContext } from "../../context/GlobalProvider";
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomBtn from "../../components/CustomBtn";
import { createEvent } from "../../lib/appwrite";

const CreateEvent = () => {
  const { user } = useGlobalContext();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    organizer: user.$id,
    banner: "",
    ticket_count: [],
    prices: [],
    price_titles: [],
    event_desc: "",
  });

  const [pricings, setPricings] = useState({
    pricing: "",
    pricing_title: "",
    ticket_count: "",
    editingIndex: null,
  });

  const handleEditng = (index) => {
    setPricings({
      pricing: eventData.prices[index],
      pricing_title: eventData.price_titles[index],
      ticket_count: eventData.ticket_count[index],
      editingIndex: index,
    });
  };

  const handleSavingPrice = () => {
    if (
      !pricings.pricing ||
      !pricings.pricing_title ||
      !pricings.ticket_count
    ) {
      Alert.alert("Empty Data");
      return;
    }
    if (pricings.editingIndex !== null) {
      setEventData((prev) => ({
        ...prev,
        prices: prev.prices.map((prices, i) =>
          i === pricings.editingIndex ? pricings.pricing : prices
        ),
        price_titles: prev.price_titles.map((titles, i) =>
          i === pricings.editingIndex ? pricings.pricing_title : titles
        ),
        ticket_count: prev.ticket_count.map((count, i) =>
          i === pricings.editingIndex ? pricings.ticket_count : count
        ),
      }));
    } else {
      setEventData((prev) => ({
        ...prev,
        ticket_count: [...prev.ticket_count, pricings.ticket_count],
        price_titles: [...prev.price_titles, pricings.pricing_title],
        prices: [...prev.prices, pricings.pricing],
      }));
    }
    setPricings({
      pricing: "",
      pricing_title: "",
      ticket_count: "",
      editingIndex: null,
    });
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setEventData((data) => ({ ...data, banner: result.assets[0] }));
    } else {
      setTimeout(() => {
        Alert.alert("No Image was Selected");
      }, 100);
    }
  };

  const handleDelete = (index) => {
    setEventData((prev) => ({
      ...prev,
      prices: prev.prices.filter((_, i) => i !== index),
      price_titles: prev.price_titles.filter((_, i) => i !== index),
      ticket_count: prev.ticket_count.filter((_, i) => i !== index),
    }));

    if (pricings.editingIndex === index) {
      setPricings({
        pricing: "",
        pricing_title: "",
        ticket_count: "",
        editingIndex: null,
      });
    }
  };

  const [isPickerVisable, setIsPickerVisable] = useState(false);
  const today = new Date();
  const showDatePicker = () => {
    setIsPickerVisable(true);
  };

  const hideDatePicker = () => {
    setIsPickerVisable(false);
  };

  const handleConfirm = (date) => {
    setEventData((prev) => ({
      ...prev,
      date: date,
    }));
    hideDatePicker();
  };

  const [submitting, setSubmitting] = useState(false);
  const submit = async () => {
    if (
      !eventData.date ||
      !eventData.date ||
      !eventData.event_desc ||
      !eventData.location ||
      !eventData.organizer ||
      !eventData.title
    ) {
      Alert.alert("empty data");
      return;
    }

    setSubmitting(true);
    try {
      await createEvent({ ...eventData });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-screen bg-stone-300">
      <ScrollView>
        <View className="py-2 justify-start items-center flex-row gap-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={34} />
          </TouchableOpacity>
          <Text className="capitalize text-lg font-bold">create event</Text>
        </View>
        <View className="p-3">
          <CreateFormInput
            title={"Event Name"}
            textStyles={"mb-2"}
            value={eventData.title}
            handleChange={(e) =>
              setEventData((data) => ({ ...data, title: e }))
            }
            inputStyles={"h-16"}
            max_lenth={80}
          />
          <View className="mt-3">
            <Text className="mb-2 font-bold">Select Image</Text>
            <TouchableOpacity onPress={selectImage}>
              {eventData.banner ? (
                <View className="w-full h-[500px]">
                  <Image
                    source={{ uri: eventData.banner.uri }}
                    className="size-full rounded-xl"
                  />
                </View>
              ) : (
                <View className="h-16 border border-black bg-lime-400 rounded-lg flex-row items-center justify-center gap-2">
                  <Text className="font-bold">Select a Image</Text>
                  <Ionicons name="image-outline" size={24} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <CreateFormInput
            value={eventData.event_desc}
            handleChange={(e) =>
              setEventData((data) => ({ ...data, event_desc: e }))
            }
            max_lenth={300}
            containerStyles={"mt-4"}
            textStyles={"mb-2"}
            textAlign="top"
            multyline={true}
            numOfLines={4}
            inputStyles={"h-[100px]"}
            title={"Event Description"}
          />

          <View className="mt-4">
            <Text className="mb-1">select a date</Text>
            <TouchableOpacity
              onPress={showDatePicker}
              className="h-16 rounded-xl bg-white justify-between items-center flex-row px-3"
            >
              <Text>{new Date(eventData.date).toLocaleString()}</Text>
              <Ionicons name="calendar-number-outline" size={24} />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isPickerVisable}
              mode="datetime"
              minimumDate={new Date()}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <CreateFormInput
            textStyles={"mb-2"}
            inputStyles={"h-16"}
            title={"location"}
            containerStyles={"mt-4"}
            value={eventData.location}
            handleChange={(e) =>
              setEventData((prev) => ({ ...prev, location: e }))
            }
            max_lenth={100}
          />
          <View className="mt-4">
            <Text className="mb-2">Add Tickets</Text>
            <View className="h-[300px] border border-dashed rounded-md">
              <ScrollView contentContainerStyle={{ height: 300, padding: 5 }}>
                {eventData.prices.length ? (
                  eventData.prices.map((price, index) => (
                    <TouchableOpacity
                      className="w-[340px] h-32 bg-white rounded-xl justify-center p-3 border border-lime-400 mb-2"
                      key={index}
                      onPress={() => handleEditng(index)}
                    >
                      <TouchableOpacity
                        onPress={() => handleDelete(index)}
                        className="self-end"
                      >
                        <Ionicons name="close" size={24} color={"red"} />
                      </TouchableOpacity>
                      <View className="flex-1 flex-row justify-between items-center mt-3">
                        <View>
                          <Text className="text-xl font-semibold">
                            {eventData.price_titles[index]}
                          </Text>
                          <Text className=" font-light ">
                            {eventData.ticket_count[index]} Tickets
                          </Text>
                        </View>
                        <Text className="text-xl font-bold">{price}.Rs</Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View className="w-full flex-1 h-[300px] items-center justify-center bg-lime-400 rounded-lg">
                    <Text>max three tears</Text>
                  </View>
                )}
              </ScrollView>
            </View>
            <View className="mt-6">
              <CreateFormInput
                max_lenth={80}
                textStyles={"mb-2"}
                value={pricings.pricing_title}
                title={"Ticket Name"}
                handleChange={(e) =>
                  setPricings({ ...pricings, pricing_title: e })
                }
                inputStyles={"h-16"}
              />
              <CreateFormInput
                max_lenth={80}
                textStyles={"mb-2"}
                value={pricings.pricing}
                title={"Ticket Price"}
                handleChange={(e) =>
                  setPricings({ ...pricings, pricing: Number(e) })
                }
                inputStyles={"h-16"}
                keyboardType="numeric"
              />
              <CreateFormInput
                max_lenth={80}
                textStyles={"mb-2"}
                value={pricings.ticket_count}
                title={"Ticket Count"}
                handleChange={(e) =>
                  setPricings({ ...pricings, ticket_count: e })
                }
                inputStyles={"h-16"}
                keyboardType="numeric"
              />
              <CustomBtn
                handlePress={handleSavingPrice}
                title={pricings.editingIndex !== null ? "Edit" : "Add"}
                containerStyles={"bg-lime-400 mt-5 w-full self-end rounded-xl"}
                textStyles={"font-bold uppercase w-full text-center"}
              />
            </View>
          </View>
          <CustomBtn
            loading={submitting}
            handlePress={submit}
            title={"create event"}
            containerStyles={"bg-lime-400 mt-5 rounded-xl"}
            textStyles={"font-bold capitalize"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CreateEvent;
