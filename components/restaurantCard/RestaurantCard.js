import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import * as Icons from 'react-native-heroicons/solid'
import { urlFor } from '../../sanity'

const RestaurantCard = ({ id, imgUrl, rating, title, genre, address, short_description, dishes, long, lat }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          rating,
          title,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
      }}
      className='bg-white mr-3 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-md w-64'
    >
      <Image source={{ uri: urlFor(imgUrl).url() }} className='h-36 w-64 rounded-md' />
      <View className='px-3 pb-4'>
        <Text className='font-bold text-lg pt-2'>{title}</Text>

        <View className='flex-row items-center space-x-2'>
          <Icons.StarIcon color='green' opacity={0.5} size={22} />
          <Text className='text-xs text-gray-500'>
            <Text className='text-green-500'>{rating}</Text> . {genre}
          </Text>
        </View>

        <View className='flex-row items-center space-x-2'>
          <Icons.LocationMarkerIcon color='gray' opacity={0.5} size={22} />
          <Text className='text-xs text-gray-500'>Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard
