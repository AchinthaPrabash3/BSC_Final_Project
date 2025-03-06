import React, {useEffect, useRef, useState,useMemo} from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform, RefreshControl, Dimensions, Image,
} from "react-native";
import {getAllGigs} from "../../lib/appwrite";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "../../context/GlobalProvider";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";
import useAppwrite from "../../hooks/useAppwrite";
import Carousel from "react-native-reanimated-carousel";

const Home = () => {
    const {user} = useGlobalContext();
    const {data, reFeatch} = useAppwrite(getAllGigs());
    const [selected, setSelected] = useState(0);

    const [isRefressing, setIsRefressing] = useState(false);
    const onRefresh = async () => {
        setIsRefressing(true);
        await reFeatch();
        setIsRefressing(false);
    };

    const windowWidth = Dimensions.get("window").width;
    const carouselData = [
        {
            id: "1",
            imageUrl: "https://images.pexels.com/photos/30993848/pexels-photo-30993848/free-photo-of-street-musicians-performing-by-colorful-murals.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
        },
        {
            id: "2",
            imageUrl: "https://images.pexels.com/photos/30993837/pexels-photo-30993837/free-photo-of-aerial-view-of-boats-on-scenic-lakeside-waterfront.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
        },
        {
            id: "3",
            imageUrl: "https://images.pexels.com/photos/30971391/pexels-photo-30971391/free-photo-of-ancient-roman-amphitheater-in-beit-she-an.png?auto=compress&cs=tinysrgb&w=1200&lazy=load"
        },
    ];


    const carousel = useMemo(() => ( <Carousel
        style={{marginTop:10,borderRadius:20}}

        loop
        width={windowWidth-13}
        height={200}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={3000}
        renderItem={({item}) => (
            <View className="flex-1 items-center justify-center overflow-hidden">
                <Image source={{uri:item.imageUrl}} className='size-full'/>
            </View>
        )}
    />), [])

    return (
        <SafeAreaView
            className={`h-screen ${Platform.OS == "ios" ? "p-2" : "p-4"} `}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                className="h-full flex-1"
                data={data}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) => <ProductCard {...item} key={item.id}/>}
                contentContainerStyle={{paddingBottom: 100}}
                ListHeaderComponent={() => (
                    <View className="pt-4">
                        <View className="flex-row items-center justify-between">
                            <View className="pl-2">
                                <Text className="text-base font-light -mb-1">welcome back</Text>
                                <Text className="text-2xl font-semibold">{user.username}</Text>
                            </View>
                            <View className="size-10 bg-lime-400 rounded-full"></View>
                        </View>
                        <SearchInput placeholder={"Search....."}/>
                        {carousel}
                    </View>
                )}
                refreshControl={
                    <RefreshControl refreshing={isRefressing} onRefresh={onRefresh}/>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default Home;