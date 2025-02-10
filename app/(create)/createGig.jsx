import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormComponent from "../../components/FormComponent";

const CreateGig = () => {
  return (
    <SafeAreaView className="h-screen bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={32} />
          </TouchableOpacity>
        </View>
        <View>
          <FormComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CreateGig;
