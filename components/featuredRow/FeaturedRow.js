import React, { useEffect, useState } from 'react'
import * as Icons from 'react-native-heroicons/solid'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import RestaurantCard from '../restaurantCard/RestaurantCard'
import sanityClient from '../../sanity'

const FeaturedRow = ({ id, title, description }) => {
  const [loading, setLoading] = useState(false)
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    setLoading(true)
    sanityClient
      .fetch(
        `
        *[_type == 'featured' && _id == '${id}'] {
          ...,
          restaurant[]->{
            ...,
            dishes[]->,
            type-> {
              name
            }
          }
        }[0]
    `,
        { id } // params
      )
      .then(data => {
        setRestaurants(data?.restaurant)
        setLoading(false)
      })
  }, [id])

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
        {loading ? (
          <View className='flex-1 mt-10 justify-center items-center'>
            <ActivityIndicator size='large' color='#00ccbb' />
          </View>
        ) : (
          restaurants?.map(restaurant => (
            <RestaurantCard
              key={restaurant?._id}
              id={restaurant?._id}
              imgUrl={restaurant?.image}
              address={restaurant?.address}
              title={restaurant?.name}
              rating={restaurant?.rating}
              genre={restaurant?.type?.name}
              short_description={restaurant?.short_description}
              dishes={restaurant?.dishes}
              long={restaurant?.long}
              lat={restaurant?.lat}
            />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow
