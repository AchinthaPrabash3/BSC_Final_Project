import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
import DateTimePicker from "react-native-modal-datetime-picker";
import CustomBtn from "../../components/CustomBtn";
import { createEvent, getTicketInfo, updateEvent } from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";

const EditEvent = () => {
  const { id } = useLocalSearchParams();
  const { data } = useAppwrite(getTicketInfo(id));

  const [eventData, setEventData] = useState({
    eventId: id,
    title: "",
    date: "",
    location: "",
    banner: "",
    event_desc: "",
  });

  useEffect(() => {
    setEventData((prev) => ({
      ...prev,
      eventId: id,
      title: data.eventname || "",
      date: data.date || "",
      location: data.location || "",
      banner: data.banner || "",
      event_desc: data.event_desc || "",
    }));
  }, [data]);

  const [pricings, setPricings] = useState({
    pricing: "",
    pricing_title: "",
    ticket_count: "",
    editingIndex: null,
  });

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
      !eventData.event_desc ||
      !eventData.location ||
      !eventData.title ||
      !eventData.banner
    ) {
      Alert.alert("empty data");
      return;
    }

    Alert.alert(
      "Update Event",
      "By clicking ok you will be making the changes permenent",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Ok",
          onPress: async () => {
            setSubmitting(true);
            try {
              await updateEvent({ ...eventData });
            } catch (error) {
              console.log(error);
            } finally {
              setSubmitting(false);
              router.back();
            }
          },
        },
      ],
      {
        cancelable: true,
      }
    );
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
            max_lenth={80}
            handleChange={(e) =>
              setEventData((data) => ({ ...data, title: e }))
            }
            inputStyles={"h-16"}
          />
          <View className="mt-3">
            <Text className="mb-2 font-bold">Select Image</Text>
            <TouchableOpacity onPress={selectImage}>
              {eventData.banner ? (
                <View className="w-full h-[500px]">
                  <Image
                    source={{
                      uri:
                        typeof eventData.banner === "string"
                          ? eventData.banner // If it's a URL, use it directly
                          : eventData.banner.uri, // Otherwise, use the object URI
                    }}
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
            max_lenth={400}
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
            max_lenth={100}
            handleChange={(e) =>
              setEventData((prev) => ({ ...prev, location: e }))
            }
          />

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

export default EditEvent;
