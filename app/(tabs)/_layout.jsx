import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export const TabIcons = ({ color, focused, icon, name }) => {
  return (
    <View className="items-center justify-center">
      <AntDesign size={24} name={icon} color={color} />
      <Text
        className={`${
          focused ? "font-semibold" : "font-light"
        } text-xs uppercase mt-1`}
      >
        {name}
      </Text>
    </View>
  );
};

const Layout = () => {
  const tabBarData = [
    { name: "home", icon: "home", path: "home" },
    { name: "events", icon: "calendar", path: "events" },
    { name: "messages", icon: "message1", path: "messages" },
    // { name: "cart", icon: "shoppingcart", path: "cart" },
    { name: "profile", icon: "user", path: "profile" },
  ];

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#a3e635",
          tabBarInactiveTintColor: "#758694",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            height: Platform.OS == "ios" ? 84 : 80,
            paddingTop: Platform.OS == "ios" ? 25 : 20,
            borderColor: "#a3e635",
          },
        }}
      >
        {tabBarData.map(({ name, path, icon }, i) => (
          <Tabs.Screen
            key={i}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused, color }) => (
                <TabIcons
                  color={color}
                  focused={focused}
                  name={name}
                  icon={icon}
                />
              ),
              tabBarIconStyle: {
                width: "100%",
              },
            }}
            name={path}
          />
        ))}
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
};

const styles = StyleSheet.create({});

export default Layout;
