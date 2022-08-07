import React from 'react'
import * as Icons from 'react-native-heroicons/solid'
import { View, Text, ScrollView } from 'react-native'
import RestaurantCard from '../restaurantCard/RestaurantCard'

const FeaturedRow = ({ id, title, description }) => {
  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <Icons.ArrowRightIcon size={20} color='#00ccbb' />
      </View>
      <Text className='text-xs text-gray-500 px-4'>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
        {/* Restaurant Card.... */}
        <RestaurantCard
          id='123'
          imgUrl='https://links.papareact.com/gn7'
          title='Yo! Sushi'
          rating={4.5}
          genre='Japanese'
          address='123 Main st.'
          short_description='This is a test description'
          dishes={[]}
          long={72.897656}
          lat={89.675467}
        />

        <RestaurantCard
          id='123'
          imgUrl='https://links.papareact.com/gn7'
          title='Yo! Sushi'
          rating={4.5}
          genre='Japanese'
          address='123 Main st.'
          short_description='This is a test description'
          dishes={[]}
          long={72.897656}
          lat={89.675467}
        />
      </ScrollView>
    </View>
  )
}

export default FeaturedRow
