import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const ManageLayout = () => {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="manageEvent" />
      <Stack.Screen options={{ headerShown: false }} name="manageGig" />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default ManageLayout;
