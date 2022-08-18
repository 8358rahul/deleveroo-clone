import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import SanityClient from "../sanity";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategory, setFeaturedCategory] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await SanityClient.fetch(
        `*[_type == "featured"]{
          ...,
          restaurant[]->{
            ...,
            dishes[]->
        }
      }`
      )
      // const data =await result.json();
      setFeaturedCategory(result);
    } 
    fetchData();
  }, []);

  return (
    <SafeAreaView className="bg-white w-full my-5">
      {/* Header */}
      <View className="flex-row  item-center mx-4 space-x-2 px-2 mt-10">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="text-gray-400 font-bold text-xs">Deliver Now!</Text>
          <Text className="text-xl font-bold">
            Current Location
            <ChevronDownIcon
              //   className="text-gray-400 h-4 w-4"
              size={20}
              color="#00CCBB"
            />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 mx-4 px-2 my-2">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <SearchIcon size={20} color="gray" />
          <TextInput
            placeholder="Search"
            className="pl-2"
            keyboardType="default"
          />
        </View>
        <AdjustmentsIcon size={20} color="#00CCBB" />
      </View>
      {/* Body */}
      <ScrollView
        className="flex-1 bg-gray-100 my-6"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categires */}
        <Categories />

        {/* Featured Rows */}
        {featuredCategory?.map((item, index) => (
          <FeaturedRow
            key={index}
            title={item.name}
            id={item._id}
            description={item.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
