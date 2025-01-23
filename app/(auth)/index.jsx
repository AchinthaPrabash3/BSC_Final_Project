import { Link, Redirect, router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
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
      setIsLoggedIn(true);
      setUser(result);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error signing in", error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-slate-900 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center size-full bg-slate-900 px-5">
          <Text className="text-5xl capitalize text-white w-full text-center">
            sign in
          </Text>
          <View className="w-full gap-5">
            <FormComponent
              value={loginData.email}
              handleChange={(e) =>
                setLoginData({ ...loginData, email: e.toLowerCase() })
              }
              containerStyles={"w-full"}
              title={"email"}
              keyboardType={"email-address"}
              textStyles={
                "mb-2 uppercase text-gray-100 font-light tracking-widest"
              }
            />
            <FormComponent
              value={loginData.password}
              handleChange={(e) => setLoginData({ ...loginData, password: e })}
              containerStyles={"w-full"}
              title={"password"}
              textStyles={
                "mb-2 uppercase text-gray-100 font-light tracking-widest"
              }
            />
          </View>
          <CustomBtn
            loading={isSubmitting}
            title={"sign in"}
            containerStyles={"bg-red-600 w-full mt-10 rounded-lg"}
            handlePress={submit}
          />
          <View>
            <Text>dont have a account ? </Text>
            <Link href={"sign-up"}>signup</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default index;
