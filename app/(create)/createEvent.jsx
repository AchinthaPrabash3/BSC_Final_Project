import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateEvent = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CreateEvent;
