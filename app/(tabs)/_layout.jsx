import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

const Layout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen options={{ headerShown: false }} name="home" />
        <Tabs.Screen options={{ headerShown: false }} name="messages" />
        <Tabs.Screen options={{ headerShown: false }} name="cart" />
        <Tabs.Screen options={{ headerShown: false }} name="profile" />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
};

const styles = StyleSheet.create({});

export default Layout;
