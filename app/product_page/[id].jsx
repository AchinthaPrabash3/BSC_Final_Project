import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductPage = () => {
  const { name, id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>
            {id} - {name}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ProductPage;
