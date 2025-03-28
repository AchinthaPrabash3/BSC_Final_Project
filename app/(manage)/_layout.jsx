import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const ManageLayout = () => {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="manageEvent" />
      <Stack.Screen options={{ headerShown: false }} name="manageGig" />
      <Stack.Screen options={{ headerShown: false }} name="order" />
      <Stack.Screen options={{ headerShown: false }} name="editGig" />
      <Stack.Screen options={{ headerShown: false }} name="editEvent" />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default ManageLayout;
