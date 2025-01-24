import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  return (
    <SafeAreaView className="h-screen">
      <View className="h-full items-center justify-center">
        <Text>cart</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Cart;
