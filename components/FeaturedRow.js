import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import SanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await SanityClient.fetch(
         `*[_type == "featured" && _id == "${id}"]{
            ...,
            restaurant[]->{
              ...,
              dishes[]->,
              type->{
                name
              }
            },
         }[0]`,
         {id}         
      );
      // const data = await result.json();
      setRestaurants(result?.restaurant);
    };
    fetchData();
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon size={20} color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        className="flex-1 pt-4"
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {/* Restaurants Carts... */}
        {restaurants?.map((item) => (
             <RestaurantCard
             key={item._id}
             id={item._id}
             title={item.name}
             rating={item.rating}
             genre={item.type?.name}
             address={item.address}
             dishes={item.dishes}
             long={item.long}
             lat={item.lat}
             imgUrl={item.image}
            short_description={item.short_description}
           />

        ))}
       
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
