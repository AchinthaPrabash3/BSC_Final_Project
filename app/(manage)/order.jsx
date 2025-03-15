import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { completeOrder } from "../../lib/appwrite";

const Order = () => {
  const {
    $id,
    price,
    canceled,
    completed,
    securityCode,
    gigId,
    date,
    buyerId,
  } = useLocalSearchParams();
  const [securityCodes, setSecurityCodes] = useState(0);

  const compleOrders = async () => {
    try {
      await completeOrder($id);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(securityCode);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={30} />
      </TouchableOpacity>
      <ScrollView>
        <TextInput
          value={securityCodes}
          onChangeText={(e) => {
            setSecurityCodes(e);
          }}
          className="bg-slate-400 h-16 w-full text-center"
          keyboardType="decimal-pad"
        />
        <TouchableOpacity
          onPress={() => {
            if (securityCode == Number(securityCodes)) {
              compleOrders();
            }
          }}
        >
          <Text>complete</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Order;
