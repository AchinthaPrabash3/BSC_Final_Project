import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import useAppwrite from "../hooks/useAppwrite";
import { getOrders } from "../lib/appwrite";

const GigStats = ({ id }) => {
  const { data, reFetch } = useAppwrite(getOrders(id));

  const [activeOrders, setActiveOrders] = useState(0);
  const [incRow, setIncRow] = useState(0);
  const [incRowAmount, setIncRowAmount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (data) {
      let activeOrdersCount = 0;
      let incompleteAmount = 0;
      let totalRevenue = 0;

      data.forEach((order) => {
        if (order.canceled) return; // Ignore canceled orders

        if (order.completed) {
          totalRevenue += order.price || 0;
        } else {
          incompleteAmount += order.price || 0;
          activeOrdersCount++; // Active orders are incomplete and not canceled
        }
      });

      setActiveOrders(activeOrdersCount);
      setIncRowAmount(incompleteAmount);
      setRevenue(totalRevenue);
      setIncRow(data.length);
    }
  }, [data]);

  return (
    <View className="p-2 bg-lime-400 flex justify-center items-start rounded-lg">
      <Text className="bg-white px-2 py-3 rounded-lg mb-3">
        Total Orders: <Text className="font-bold">{incRow}</Text>
      </Text>
      <View className="flex-row gap-5">
        <Text className="bg-white px-2 py-3 rounded-lg">
          Active Orders: <Text className="font-bold">{activeOrders}</Text>
        </Text>
        <Text className="bg-white px-2 py-3 rounded-lg">
          Earned: <Text className="font-bold">${revenue.toFixed(2)}</Text>
        </Text>
      </View>
      <Text className="bg-white px-2 py-3 rounded-lg mt-3">
        Escrowed: <Text className="font-bold">${incRowAmount.toFixed(2)}</Text>
      </Text>

      {/* Refresh Button */}
      <TouchableOpacity
        onPress={reFetch}
        className="bg-blue-500 px-4 py-2 rounded-lg mt-4"
      >
        <Text className="text-white font-bold">Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GigStats;
