import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import CreateFormInput from "../../components/CreateFormInput";
import CustomBtn from "../../components/CustomBtn";
import { createGig } from "../../lib/appwrite";

const CreateGig = () => {
  const { user } = useGlobalContext();
  const [gigData, setGigData] = useState({
    title: "",
    content: null,
    description: "",
    creator: user.$id,
    price_titles: [],
    prices: [],
    price_desc: [],
    gig_type: [],
  });

  const [tags, setTags] = useState({
    tagName: "",
  });

  const [pricing, setPricing] = useState({
    priceing: "",
    pricing_title: "",
    pricing_description: "",
    editingIndex: null, // Track the index of the item being edited
  });

  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setGigData({ ...gigData, content: result.assets[0] });
    } else {
      setTimeout(() => {
        Alert.alert("No Image was Selected");
      }, 100);
    }
  };

  const handleEditPricing = (index) => {
    // Populate the `pricing` state with the selected pricing tier's data
    setPricing({
      priceing: gigData.prices[index],
      pricing_title: gigData.price_titles[index],
      pricing_description: gigData.price_desc[index],
      editingIndex: index, // Track the index of the item being edited
    });
  };

  const handleSavePricing = () => {
    if (
      !pricing.priceing ||
      !pricing.pricing_description ||
      !pricing.pricing_title
    ) {
      Alert.alert("Please enter all the details to save the tier");
      return;
    }
    if (pricing.editingIndex !== null) {
      // Update the existing pricing tier in `gigData`
      setGigData((prev) => ({
        ...prev,
        price_titles: prev.price_titles.map((title, i) =>
          i === pricing.editingIndex ? pricing.pricing_title : title
        ),
        prices: prev.prices.map((price, i) =>
          i === pricing.editingIndex ? pricing.priceing : price
        ),
        price_desc: prev.price_desc.map((desc, i) =>
          i === pricing.editingIndex ? pricing.pricing_description : desc
        ),
      }));
    } else {
      // Add a new pricing tier if no index is being edited
      setGigData({
        ...gigData,
        prices: [...gigData.prices, pricing.priceing],
        price_desc: [...gigData.price_desc, pricing.pricing_description],
        price_titles: [...gigData.price_titles, pricing.pricing_title],
      });
    }
    // Reset the `pricing` state after saving
    setPricing({
      priceing: "",
      pricing_title: "",
      pricing_description: "",
      editingIndex: null,
    });
  };

  const handleDeletePricing = (index) => {
    // Remove the pricing tier at the specified index
    setGigData((prev) => ({
      ...prev,
      price_titles: prev.price_titles.filter((_, i) => i !== index),
      prices: prev.prices.filter((_, i) => i !== index),
      price_desc: prev.price_desc.filter((_, i) => i !== index),
    }));

    // Reset the `pricing` state if the deleted tier was being edited
    if (pricing.editingIndex === index) {
      setPricing({
        priceing: "",
        pricing_title: "",
        pricing_description: "",
        editingIndex: null,
      });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitGig = async () => {
    if (
      !gigData.content ||
      !gigData.creator ||
      !gigData.description ||
      !(gigData.gig_type.length >= 3) ||
      !gigData.prices.length ||
      !gigData.price_desc.length ||
      !gigData.price_titles.length ||
      !gigData.title
    ) {
      Alert.alert("please fill out all the fomrs");
      return;
    }

    setIsSubmitting(true);
    try {
      await createGig({ ...gigData });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-screen bg-stone-300">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        className="p-3 "
      >
        {/* Header */}
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={32} />
          </TouchableOpacity>
          <Text className="capitalize flex-1 text-lg font-bold">
            create a gig
          </Text>
        </View>

        {/* Gig Title Input */}
        <CreateFormInput
          handleChange={(e) => setGigData({ ...gigData, title: e })}
          title={"gig title"}
          value={gigData.title}
          textStyles={"mb-2 capitalize"}
          placeholder={"catchy title ....."}
          containerStyles={"mt-5"}
          max_lenth={80}
          inputStyles={"h-16"}
        />

        {/* Banner Image */}
        <View className="mt-5">
          <Text>Banner Image</Text>
          <TouchableOpacity
            onPress={getImage}
            className="h-[200px] w-full bg-lime-300 mt-1 rounded-lg overflow-hidden"
          >
            {gigData.content ? (
              <View
                className={`size-full rounded-lg ${
                  gigData.content ? "border-2 border-lime-400" : ""
                }`}
              >
                <Image
                  source={{ uri: gigData.content.uri }}
                  className="size-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View className="size-full items-center justify-center">
                <Ionicons name="image-outline" size={40} />
                <Text className="w-full text-center">Select a Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Description Input */}
        <CreateFormInput
          handleChange={(e) => setGigData({ ...gigData, description: e })}
          title={"description"}
          value={gigData.description}
          textStyles={"mb-2 capitalize"}
          containerStyles={"mt-5"}
          max_lenth={200}
          numOfLines={4}
          multyline={true}
          textAlign={"top"}
          inputStyles={"h-[100px]"}
        />

        {/* Pricing Tiers */}
        <Text>pricing tiers</Text>
        <View className="w-full h-[300px] border border-dashed rounded my-4 p-2">
          <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
            {gigData.prices.length > 0 ? (
              <View>
                {gigData.prices.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleEditPricing(i)}
                    className="mr-2"
                  >
                    <View className="bg-white p-2 rounded-lg">
                      {/* Close Icon */}
                      <TouchableOpacity
                        onPress={() => handleDeletePricing(i)} // Delete the pricing tier
                        className="self-end"
                      >
                        <Ionicons name="close" size={20} color="red" />
                      </TouchableOpacity>
                      <Text>{gigData.price_titles[i]}</Text>
                      <Text>{gigData.price_desc[i]}</Text>
                      <Text>{item}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className="w-full h-full items-center justify-center flex-1 bg-lime-400 rounded-lg">
                <Text className="text-center">
                  Add your pricing tiers (max 3)
                </Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Pricing Inputs */}
        <View>
          <CreateFormInput
            handleChange={(e) => setPricing({ ...pricing, pricing_title: e })}
            title={"pricing title"}
            value={pricing.pricing_title}
            textStyles={"mb-2 capitalize"}
            containerStyles={"mt-5"}
            max_lenth={80}
            inputStyles={"h-16"}
          />
          <CreateFormInput
            handleChange={(e) => setPricing({ ...pricing, priceing: e })}
            title={"pricing"}
            value={pricing.priceing}
            textStyles={"mb-2 capitalize"}
            containerStyles={"mt-5"}
            max_lenth={80}
            inputStyles={"h-16"}
          />
          <CreateFormInput
            handleChange={(e) =>
              setPricing({ ...pricing, pricing_description: e })
            }
            title={"pricing description"}
            value={pricing.pricing_description}
            textStyles={"mb-2 capitalize"}
            containerStyles={"mt-5"}
            max_lenth={200}
            numOfLines={4}
            multyline={true}
            textAlign={"top"}
            inputStyles={"h-[100px]"}
          />
          <CustomBtn
            handlePress={handleSavePricing} // Save or update the pricing tier
            title={pricing.editingIndex !== null ? "Update Tier" : "Add Tier"}
            containerStyles={"bg-lime-400 mt-4 "}
            textStyles={"uppercase w-full text-center"}
          />
        </View>
        <View className="mt-5">
          <Text className="capitalize">tags</Text>
          <View className="mt-1">
            <View className="w-full h-12 border border-dashed p-1 mb-2">
              <ScrollView horizontal contentContainerStyle={{ gap: 5 }}>
                {gigData.gig_type.length > 0 ? (
                  gigData.gig_type.map((item, index) => (
                    <View
                      key={index}
                      className="flex-row items-center rounded-lg bg-lime-400 gap-2 px-2"
                    >
                      <Text>{item}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setGigData((prev) => ({
                            ...prev,
                            gig_type: prev.gig_type.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                      >
                        <Ionicons name="close" size={20} />
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <View className="w-[350px] items-center justify-center">
                    <Text className="text-xs">
                      Enter Tags Related to your Gig
                    </Text>
                    <Text className="text-xs">Max 5 Tags</Text>
                  </View>
                )}
              </ScrollView>
            </View>
            <TextInput
              value={tags.tagName}
              className="h-16 flex-1 bg-white rounded-lg"
              onChangeText={(e) => setTags({ ...tags, tagName: e })}
              onSubmitEditing={() => {
                if (gigData.gig_type.length < 5) {
                  setGigData({
                    ...gigData,
                    gig_type: [...gigData.gig_type, tags.tagName],
                  });
                  setTags({ ...tags, tagName: "" });
                } else {
                  Alert.alert("max number of tasgs");
                }
              }}
            />
          </View>
        </View>
        <CustomBtn
          loading={isSubmitting}
          handlePress={submitGig}
          title={"Create Gig"}
          containerStyles={"bg-lime-400 mt-4 "}
          textStyles={"uppercase w-full text-center"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateGig;
