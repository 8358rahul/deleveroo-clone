import { View, Text,SafeAreaView, ImageBackground } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const PreparingOrderScreen = () => {
    const navigation = useNavigation()

     useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery')
        }, 4000)
   
     }, [])
     
  return (
    <SafeAreaView className="bg-[#272829] flex-1 items-center">
        <Animatable.Image 
            source={require('../assets/orderLoading.gif')}
            animation="slideInUp"
            iterationCount={1}
            className="bg-contain bg-no-repeat h-4/6"
        />
        
        <Animatable.Text 
            animation="slideInUp"
            iterationCount={1}
            className="text-lg my-10 text-white font-bold text-center"
        >
        Preparing your order
        </Animatable.Text>
        <Progress.Circle 
            size={60}
            indeterminate={true}
            color="#00CCBB"
            borderWidth={1.5}

        />
         
    </SafeAreaView>
  )
}

export default PreparingOrderScreen