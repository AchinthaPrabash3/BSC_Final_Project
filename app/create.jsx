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

const Create = () => {
  return (
    <SafeAreaView className="h-screen bg-main">
      <ScrollView>
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Create;
