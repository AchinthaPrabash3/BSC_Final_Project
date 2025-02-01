import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Link, router } from "expo-router";
import { signOut } from "../../lib/appwrite";
const Profile = () => {
  const { setIsLoggedIn, setUser } = useGlobalContext();

  return (
    <View className="items-center justify-center h-screen">
      <TouchableOpacity
        onPress={() => {
          setIsLoggedIn(false);
          setUser(null);
          signOut();
          router.replace("(auth)");
        }}
      >
        <Text>sign out</Text>
      </TouchableOpacity>
      <Link href="create">create</Link>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
