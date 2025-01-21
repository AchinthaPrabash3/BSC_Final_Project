import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen options={{ headerShown: false }} name="home" />
      <Tabs.Screen options={{ headerShown: false }} name="profile" />
    </Tabs>
  );
};

const styles = StyleSheet.create({});

export default Layout;
