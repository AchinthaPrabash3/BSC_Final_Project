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
  const [focus, setFocus] = useState(false);
  return (
    <View className={`${containerStyles}`}>
      <Text className={textStyles}>{title}</Text>
      <View
        className={`w-full flex-none h-16 bg-white rounded-xl flex-row items-center px-2 ${
          focus ? "border-2 border-second" : ""
        }`}
      >
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={inputReff}
          className="h-full flex-1 px-2 rounded-xl items-center justify-center"
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
