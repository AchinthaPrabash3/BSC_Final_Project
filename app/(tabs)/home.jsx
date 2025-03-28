import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  RefreshControl,
  Dimensions,
  Image,
} from "react-native";
import { getAllGigs } from "../../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";
import Carousel from "react-native-reanimated-carousel";
import logo from "../../assets/logo-1.png";
import useAppwrite from "../../hooks/useAppwrite";
import adOne from "../../assets/ad_one.png";
const Home = () => {
  const { user } = useGlobalContext();
  const { data, reFeatch } = useAppwrite(getAllGigs());

  const [isRefressing, setIsRefressing] = useState(false);
  const onRefresh = async () => {
    setIsRefressing(true);
    try {
      await reFeatch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefressing(false);
    }
  };

  // Screen width and padding adjustment
  const [scWidth, setScWidth] = useState(Dimensions.get("window").width);
  useEffect(() => {
    const onChange = () => {
      setScWidth(Dimensions.get("window").width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  const carouselData = [
    {
      id: "1",
      imageUrl:
        "https://i.pinimg.com/736x/14/ec/16/14ec16c6b51b3f861126acf5155caf2a.jpg",
    },
    {
      id: "2",
      imageUrl:
        "https://i.pinimg.com/736x/2f/ec/ce/2feccef683b6f02cc254b8e1594baaaf.jpg",
    },
    {
      id: "3",
      imageUrl:
        "https://i.pinimg.com/736x/b3/7d/62/b37d62f3e01db5b1657c5539ac681454.jpg",
    },
  ];

  // Adjust the carousel width to fit within the parent container
  const carouselWidth = scWidth - (Platform.OS === "ios" ? 12 : 40); // Account for padding

  const carousel = useMemo(
    () => (
      <Carousel
        style={{ marginTop: 10, borderRadius: 5, paddingHorizontal: 5 }}
        loop
        width={carouselWidth} // Use adjusted width
        height={200}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={3000}
        renderItem={({ item }) => (
          <View className="flex-1 items-center justify-center overflow-hidden">
            <Image source={{ uri: item?.imageUrl }} className="size-full" />
          </View>
        )}
      />
    ),
    [carouselData, scWidth] // Rebuild carousel if data or screen width changes
  );

  return (
    <SafeAreaView
      className={`h-screen ${Platform.OS === "ios" ? "px-2" : "px-5"} pt-4`}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        className="h-full flex-1"
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <ProductCard {...item} key={item.id} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="h-screen items-center justify-center">
            <Text className="text-xl capitalize font-bold text-slate-400">
              No Gigs Found
            </Text>
          </View>
        }
        ListHeaderComponent={() => (
          <View className="pt-4">
            {/* Header Content */}
            <View className="flex-row items-center justify-between">
              <View className="pl-2">
                <Text className="text-base font-light -mb-1">welcome back</Text>
                <Text className="text-2xl font-semibold">{user?.username}</Text>
              </View>
              <View className="size-10 overflow-hidden border border-lime-400 bg-lime-400 rounded-full">
                <Image
                  source={logo}
                  className="size-full"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput placeholder={"Search....."} />

            {/* Centered Carousel */}
            <View
              style={{
                justifyContent: "center", // Center horizontally
                alignItems: "center", // Center vertically (if needed)
              }}
            >
              {carousel}
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefressing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
