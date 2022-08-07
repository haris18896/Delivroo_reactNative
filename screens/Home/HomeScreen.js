import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, ScrollView } from 'react-native'
import Header from '../../components/Header'
import Categories from '../../components/categories/Categories'
import FeaturedRow from '../../components/featuredRow/FeaturedRow'

const HomeScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  return (
    <SafeAreaView className='pt-10 bg-white'>
      <Header />
      <ScrollView className='bg-gray-100' contentContainerStyle={{ paddingBottom: 100 }}>
        <Categories />
        {/* Featured */}
        <FeaturedRow id='1' title='Featured' description='paid a placement from our partners' />
        {/* Tasty Discounts */}
        <FeaturedRow id='12' title='Tasty Discount' description="Everyone's been enjoying these juicy discounts" />
        {/* Offers near you */}
        <FeaturedRow id='123' title='Offers near you!' description='Why not support your local restaurant tonight' />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
