import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateFormInput from "../../components/CreateFormInput";
import CustomBtn from "../../components/CustomBtn";
import Colapsable from "../../components/Colapsable";
import {
  addOrUpdateBio,
  getUserBookedGigs,
  getUserBoughtTickets,
  updateProfilePic,
  updateUsername,
} from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";
import BaughtGigCard from "../../components/BaughtGigCard";
import BaughtTickets from "../../components/BaughtTickets";
import * as ImagePicker from "expo-image-picker";

const Settings = () => {
  const { id } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateing, setUpdateing] = useState(false);
  const [bioText, setBioText] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const { data: userBaughtGigs } = useAppwrite(getUserBookedGigs(id));
  const { data: tickets } = useAppwrite(getUserBoughtTickets(id));

  const getImage = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    if (!results.canceled) {
      setProfilePic(results.assets[0]);
    } else {
      setTimeout(() => Alert.alert("No Image was Selected"), 100);
    }
  };

  const addOrupdateBioT = async () => {
    if (!bioText) {
      Alert.alert("please entera bio to update");
      return;
    }
    setUpdateing(true);
    try {
      await addOrUpdateBio(id, bioText);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateing(false);
      router.back();
    }
  };

  const updateProfilePics = async () => {
    if (!profilePic) {
      Alert.alert("please select a image to update");
      return;
    }
    setUpdateing(true);
    try {
      await updateProfilePic(id, profilePic);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateing(false);
      router.back();
    }
  };

  const handleUpdateUsername = async () => {
    if (!username) {
      Alert.alert("please entera user name to update");
      return;
    }

    setUpdateing(true);
    try {
      updateUsername(id, username);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateing(false);
      router.back();
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 5 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Ionicons name="chevron-back-outline" size={32} />
          <Text className="text-lg capitalize">settings</Text>
        </TouchableOpacity>
        <Colapsable title={"Add / Update Bio"}>
          <CreateFormInput
            title={"bio"}
            value={bioText}
            handleChange={(e) => setBioText(e)}
            max_lenth={200}
            textStyles={"mb-2 capitalize"}
            containerStyles={"mt-5"}
            numOfLines={4}
            multyline={true}
            textAlign={"top"}
            inputStyles={"h-[100px]"}
            placeholder="Tell us about you..."
          />
          <CustomBtn
            handlePress={addOrupdateBioT}
            loading={updateing}
            title={"Update"}
            containerStyles={"self-end bg-lime-400 px-8 mt-2 rounded-lg"}
            textStyles={"capitalize self-start text-center font-bold"}
          />
        </Colapsable>
        <Colapsable title={"Update Username"}>
          <CreateFormInput
            title={"username"}
            value={username}
            handleChange={(e) => setUsername(e)}
            max_lenth={80}
            textStyles={"mb-2 capitalize"}
            containerStyles={"mt-5"}
            inputStyles={"h-16"}
            placeholder="jhon doe"
          />
          <CustomBtn
            handlePress={handleUpdateUsername}
            title={"Update"}
            containerStyles={"self-end bg-lime-400 px-8 mt-2 rounded-lg"}
            textStyles={"capitalize self-start text-center font-bold"}
          />
        </Colapsable>
        <Colapsable title={"Update Profile Pictre"}>
          <View className="items-center justify-center">
            <Text className="capitalize text-lg font-bold mb-2">image</Text>
            <TouchableOpacity onPress={getImage} className="size-[200px]">
              {profilePic ? (
                <View className="size-[200px]">
                  <Image
                    source={{ uri: profilePic.uri }}
                    className="size-[200px] rounded-xl"
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View className="size-[200px] bg-lime-400">
                  <Text>Select a Image</Text>
                </View>
              )}
            </TouchableOpacity>
            <CustomBtn
              loading={updateing}
              handlePress={updateProfilePics}
              containerStyles={"self-center my-4 rounded-lg bg-lime-400 px-5"}
              title={"update"}
              textStyles={"capitalize font-bold"}
            />
          </View>
        </Colapsable>
        <Colapsable title={"Order History"}>
          <ScrollView className="h-[300px]">
            {userBaughtGigs.map((gigData, i) =>
              gigData?.gigId !== null ? (
                <BaughtGigCard {...gigData} key={i} />
              ) : (
                ""
              )
            )}
          </ScrollView>
        </Colapsable>
        <Colapsable title={"Ticket History"}>
          <ScrollView className="h-[300px]">
            {tickets.map((ticketData, i) =>
              ticketData?.eventId?.eventname !== null ? (
                <BaughtTickets {...ticketData} key={i} />
              ) : (
                ""
              )
            )}
          </ScrollView>
        </Colapsable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Settings;
