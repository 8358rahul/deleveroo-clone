import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
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
}) => { 

  const navigation = useNavigation();

  return (
    <TouchableOpacity className='bg-white mr-3 shadow'
    onPress={() => {
      navigation.navigate("RestaurantScreen", {
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
      });
    }}
    >
      <Image source={{
        uri:urlFor(imgUrl).url()
       }} 
        className='w-full h-44 bg-gray-300 p-4'
       />
      <View className="flex-1 px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon size={22} color="green" />
          <Text className="text-gray-500">
            <Text className="text-green-500">{rating}</Text> . {genre}
          </Text>
        </View>
        <View className='flex-row items-center space-x-1'>
            <LocationMarkerIcon size={22} color="gray" />
            <Text className="text-gray-500 text-xs">Nearby - {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
