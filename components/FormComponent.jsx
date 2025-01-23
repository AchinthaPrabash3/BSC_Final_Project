import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const FormComponent = ({
  title,
  placeholder,
  containerStyles,
  textStyles,
  handleChange,
  value,
  keyboardType,
}) => {
  const inputReff = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`${containerStyles}`}>
      <Text className={textStyles}>{title}</Text>
      <View className="w-full flex-none h-16 bg-slate-200 rounded-xl flex-row items-center">
        <TextInput
          ref={inputReff}
          className="h-full flex-1 px-2 bg-red-200 rounded-xl"
          onChangeText={handleChange}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={title == "password" && !showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className={`${title != "password" ? "hidden" : ""}`}
        >
          {showPassword ? (
            <Ionicons size={24} name="eye" />
          ) : (
            <Ionicons size={24} name="eye-off" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FormComponent;
