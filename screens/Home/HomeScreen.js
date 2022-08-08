import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native'
import Header from '../../components/Header'
import Categories from '../../components/categories/Categories'
import FeaturedRow from '../../components/featuredRow/FeaturedRow'
import sanityClient from '../../sanity'

const HomeScreen = () => {
  const navigation = useNavigation()

  const [featureCategories, setFeatureCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  useEffect(() => {
    setLoading(true)
    sanityClient
      .fetch(
        `
    *[_type == 'featured'] {
      ...,
      restaurant[]->{
        ...,
        dishes[]->
      }
    }
    `
      )
      .then(data => {
        setFeatureCategories(data)
        setLoading(false)
      })
  }, [])

  return (
    <SafeAreaView className='pt-10 bg-white'>
      <Header />

      <ScrollView className='bg-gray-100' contentContainerStyle={{ paddingBottom: 100 }}>
        <Categories />
        {loading ? (
          <View className='flex-1 mt-10 justify-center items-center'>
            <ActivityIndicator size='large' color='#00ccbb' />
          </View>
        ) : (
          featureCategories?.map(category => (
            <FeaturedRow
              key={category?._id}
              id={category?._id}
              title={category?.name}
              description={category?.short_description}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
