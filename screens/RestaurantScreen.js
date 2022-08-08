import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      title,
      rating,
      genre,
      address,
      dishes,
      long,
      imgUrl,
      short_description,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(setRestaurant({ id, title, rating, genre, address, dishes, long, imgUrl, short_description, lat }));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
    <BasketIcon />
    <ScrollView>
      <View
      // className="relative "
      >
        <Image
          source={{ uri: urlFor(imgUrl).url() }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4  ">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-start space-x-1">
              <StarIcon size={22} color="green" opacity={0.5} />
              <Text className="text-green-500">{rating}</Text>
            </View>
          </View>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-start space-x-1">
              <LocationMarkerIcon size={22} color="gray" opacity={0.4} />
              <Text className="text-green-500">Nearby - {address}</Text>
            </View>
          </View>
          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
          <QuestionMarkCircleIcon size={24} color="gray" opacity={0.6} />
          <Text className="pl-2 flex-1 text-md font-bold">
            Have food allergy?
          </Text>
          <ChevronRightIcon size={24} color="gray" opacity={0.6} />
        </TouchableOpacity>
      </View>
      <View className="pb-36">
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
        {/* Dishes */}
        {dishes.map((dish, index) => (
          <DishRow
            key={index}
            id={dish.id}
            name={dish.name}
            price={dish.price}
            description={dish.short_description}
            image={dish.image}
          />
        ))}
      </View>
    </ScrollView>
    </>
  );
};

export default RestaurantScreen;
