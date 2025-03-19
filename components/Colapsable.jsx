import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Colapsable = ({ children, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="mt-4 border border-gray-300 rounded-lg p-2">
      {/* Collapsible Header */}
      <TouchableOpacity
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row justify-between items-center p-2 bg-gray-200 rounded-lg"
      >
        <Text className="text-lg font-bold">{title}</Text>
        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} />
      </TouchableOpacity>

      {/* Collapsible Content (Fix applied here) */}
      {isExpanded && <View className="mt-2">{children}</View>}
    </View>
  );
};

export default Colapsable;
