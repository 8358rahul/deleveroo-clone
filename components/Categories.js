import { View, Text, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import CategoryCard from './CategoryCard'
import SanityClient, { urlFor } from '../sanity'


const Categories = () => {
  const [categories, setCategories] = useState([])
    useEffect(() => {
       const response = async () => {
        const result = await SanityClient.fetch(
          `*[_type == "category"]`,
          {}
        );
        // const data = await result.json();
        setCategories(result);
      }
      response();
    } , [])
  return (
    <ScrollView 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
        horizontal
    >
        {/* Categorycard */}
        {categories.map((category, index) => (         
         <CategoryCard  
          key={index}
         imgUrl= {urlFor(category.image).url()} 
         title={category.name}
         />
        ))}

       


    </ScrollView>
  )
}

export default Categories