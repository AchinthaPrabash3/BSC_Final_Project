import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormComponent from "../../components/FormComponent";
import CustomBtn from "../../components/CustomBtn";
import DropDown from "../../components/DropDown";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/appwrite";
import { Link, router } from "expo-router";
const SignUp = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!signupData.email || !signupData.password || !signupData.username) {
      Alert.alert("Error", "please Enter Values");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUser({ ...signupData });
      setIsLoggedIn(true);
      setUser(result);
      router.replace("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-slate-200">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center size-full px-4">
          <Text className="text-3xl font-bold capitalize text-black self-start flex-none text-center mb-10">
            sign up
          </Text>
          <View className="w-full gap-3">
            <FormComponent
              handleChange={(e) =>
                setSignupData({ ...signupData, username: e })
              }
              value={signupData.username}
              containerStyles={"w-full"}
              textStyles={"mb-2 uppercase font-light text-lg text-black"}
              title={"username"}
            />

            <FormComponent
              handleChange={(e) =>
                setSignupData({ ...signupData, email: e.toLowerCase() })
              }
              value={signupData.email}
              containerStyles={"w-full"}
              textStyles={"mb-2 uppercase font-light text-lg text-black"}
              keyboardType={"email-address"}
              title={"email"}
            />
            <FormComponent
              handleChange={(e) =>
                setSignupData({ ...signupData, password: e })
              }
              value={signupData.password}
              containerStyles={"w-full"}
              textStyles={"mb-2 uppercase font-light text-lg text-black"}
              title={"password"}
            />
          </View>
          <CustomBtn
            handlePress={submit}
            loading={isSubmitting}
            title={"sign up"}
            containerStyles={"bg-lime-400 w-full mt-5 rounded-xl "}
            textStyles={
              "uppercase text-center text-center w-full font-bold text-lg"
            }
          />
          <View className="flex-row mt-3">
            <Text className="text-lg">Already have a Account ? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-lg font-bold text-second capitalize">
                {" "}
                sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SignUp;
