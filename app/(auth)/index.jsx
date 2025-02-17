import { Link, Redirect, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import FormComponent from "../../components/FormComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBtn from "../../components/CustomBtn";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn, isLoggedIn, isLoading } = useGlobalContext();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!loginData.email || !loginData.password) {
      Alert.alert("please enter email and password");
      return;
    }
    setIsSubmitting(true);
    try {
      await signIn({ email: loginData.email, password: loginData.password });
      const result = await getCurrentUser();

      if (!result) {
        Alert.alert("incorect Email or Password");
        return;
      }

      setIsLoggedIn(true);
      setUser(result);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error signing in", error.message);
      console.error("sign in : ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className=" h-full bg-stone-300">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center size-full  px-5 relative">
          <View className="items-start w-full mb-10">
            <Text className="text-sm font-light capitalize text-black self-start flex-none text-center">
              sign in to
            </Text>
            <Text className="text-3xl font-bold capitalize text-black self-start flex-none text-center">
              Evently
            </Text>
          </View>
          <View className="w-full gap-3">
            <FormComponent
              value={loginData.email}
              handleChange={(e) =>
                setLoginData({ ...loginData, email: e.toLowerCase() })
              }
              containerStyles={"w-full"}
              title={"email"}
              keyboardType={"email-address"}
              textStyles={
                "mb-2 uppercase text-black font-light tracking-widest"
              }
            />
            <FormComponent
              value={loginData.password}
              handleChange={(e) => setLoginData({ ...loginData, password: e })}
              containerStyles={"w-full"}
              title={"password"}
              textStyles={
                "mb-2 uppercase text-black font-light tracking-widest"
              }
            />
          </View>
          <CustomBtn
            textStyles={"uppercase flex-none w-full text-center font-bold"}
            loading={isSubmitting}
            title={"sign in"}
            containerStyles={"bg-second w-full mt-5 rounded-lg "}
            handlePress={submit}
          />
          <View className="flex-row mt-3">
            <Text className="text-lg">Don't have a Account ?</Text>
            <Link
              href={"sign-up"}
              className="capitalize text-lg font-bold text-lime-800"
            >
              {" "}
              sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default index;
