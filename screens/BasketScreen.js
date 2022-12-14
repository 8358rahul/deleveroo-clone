import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  selectbasketItems,
  removeFromBasket,
  selectbasketTotal,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectbasketItems);
  const basketTotal = useSelector(selectbasketTotal);
  const dispatch = useDispatch();
  const [groupdedItemsInBasket, setGroupdedItemsInBasket] = useState([]);
  
  useMemo(() => {
    const groupedItems = items.reduce((acc, item) => {
      (acc[item.id] = acc[item.id] || []).push(item);
      return acc;
    }, {});
    setGroupdedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs top-5">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon height={50} width={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q=",
            }}
            className="w-7 h-7 bg-gray-300 rounded-full p-4"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupdedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-4 px-3 py-3 bg-white px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url()}}
                className="w-12 h-12 bg-gray-300 rounded-full p-4"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="GBP" />
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#00CCBB]">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
           <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400" > <Currency quantity={basketTotal} currency="GBP" /></Text>
           </View>
           <View className="flex-row justify-between">
            <Text className="text-gray-400" >Delivery Fee</Text>
            <Text className="text-gray-400" > <Currency quantity={5.99} currency="GBP" /></Text>
           </View>
           <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold" ><Currency quantity={basketTotal + 5.99} currency="GBP" /></Text>
           </View>
           <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4"
            onPress={() => navigation.navigate("PreparingOrderScreen")}
           >
             <Text className="text-center text-white text-lg font-bold">Place  Order</Text>
           </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
