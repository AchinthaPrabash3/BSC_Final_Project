import React, {useEffect} from "react";
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import useAppwrite from "../../hooks/useAppwrite";
import {searchGig} from "../../lib/appwrite";
import {SafeAreaView} from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";
import SearchInput from "../../components/SearchInput";
import {AntDesign, Ionicons} from "@expo/vector-icons";

const Query = () => {
    const {query} = useLocalSearchParams()
    const {data, reFeatch} = useAppwrite(searchGig(query));
    console.log(data);
    useEffect(() => {
        reFeatch()
    } , [query])

  return (
    <SafeAreaView className={"p-2"}>
        <ScrollView contentContainerStyle={{paddingBottom:30}}>
            <TouchableOpacity onPress={() => router.back()}  className={"flex-row items-center"} >
               <Ionicons name={'chevron-back-outline'} size={30}/>
                <Text className={"text-xl"} > searching for - {query}</Text>
            </TouchableOpacity>
            <SearchInput initialQuery={query} />
            <View>
                {
                    data.map((item, index) => <ProductCard {...item} key={index} />)
                }
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Query;
