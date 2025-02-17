import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CreateFormInput = ({
  title,
  placeholder = "",
  containerStyles,
  textStyles,
  handleChange,
  value = "",
  keyboardType = "default",
  max_lenth = 0,
  inputStyles,
  numOfLines = 1,
  multyline = false,
  textAlign = "left",
}) => {
  const inputReff = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);

  const safeValue = value ?? "";

  return (
    <View className={`${containerStyles}`}>
      <Text className={textStyles}>{title}</Text>
      <View
        className={`w-full flex-none bg-white rounded-xl flex-row items-center px-1 py-1 ${
          focus ? "border-2 border-second" : ""
        } ${inputStyles}`}
      >
        <TextInput
          textAlignVertical={textAlign}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          ref={inputReff}
          className="h-full flex-1 px-1 rounded-xl items-center justify-center"
          onChangeText={handleChange}
          value={safeValue}
          placeholder={placeholder}
          multiline={multyline}
          keyboardType={keyboardType}
          numberOfLines={numOfLines}
          secureTextEntry={title === "password" && !showPassword}
        />
      </View>
      <Text
        className={`text-xs text-right pr-2 w-full flex-1 ${
          safeValue.length > max_lenth ? "text-red-500" : "text-black"
        }`}
      >
        Char Count: {max_lenth} / {safeValue.length}
      </Text>
    </View>
  );
};

export default CreateFormInput;
