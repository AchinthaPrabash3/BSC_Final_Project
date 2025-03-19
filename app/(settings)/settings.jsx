import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
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
} from "../../lib/appwrite";
import useAppwrite from "../../hooks/useAppwrite";
import BaughtGigCard from "../../components/BaughtGigCard";
import BaughtTickets from "../../components/BaughtTickets";

const Settings = () => {
  const { id } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [updateing, setUpdateing] = useState(false);
  const [bioText, setBioText] = useState("");
  const [username, setUsername] = useState("");

  const { data: userBaughtGigs } = useAppwrite(getUserBookedGigs(id));
  const { data: tickets } = useAppwrite(getUserBoughtTickets(id));

  const addOrupdateBioT = async () => {
    try {
      await addOrUpdateBio(id, bioText);
    } catch (error) {
      console.error(error);
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
            title={"Update"}
            containerStyles={"self-end bg-lime-400 px-8 mt-2 rounded-lg"}
            textStyles={"capitalize self-start text-center font-bold"}
          />
        </Colapsable>
        <Colapsable title={"Order History"}>
          <ScrollView className="h-[300px]">
            {userBaughtGigs.map((gigData, i) =>
              gigData?.gigId !== null ? <BaughtGigCard {...gigData} /> : ""
            )}
          </ScrollView>
        </Colapsable>
        <Colapsable title={"Ticket History"}>
          {tickets.map((ticketData, i) =>
            ticketData?.eventId?.eventname !== null ? (
              <BaughtTickets {...ticketData} key={i} />
            ) : (
              ""
            )
          )}
        </Colapsable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Settings;
