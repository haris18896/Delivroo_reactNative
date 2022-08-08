import React, { useLayoutEffect } from 'react'
import { urlFor } from '../../sanity'
import * as Icons from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import DishRow from '../../components/dishRow/DishRow'

const RestaurantScreen = () => {
  const navigation = useNavigation()
  const {
    params: { id, imgUrl, rating, title, genre, address, short_description, dishes, long, lat },
  } = useRoute()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <ScrollView>
      <View className='relative'>
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className='w-full h-56 bg-gray-300 p-4'
        />

        <TouchableOpacity onPress={navigation.goBack} className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'>
          <Icons.ArrowLeftIcon size={20} color='#00ccbb' />
        </TouchableOpacity>
      </View>

      <View className='bg-white'>
        <View className='px-4 pt-4'>
          <Text className='text-3x font-bold'>{title}</Text>
          <View className='flex-row space-x-2 my-1'>
            <View className='flex-row items-center space-x-1'>
              <Icons.StarIcon size={20} color='green' opacity={0.5} />
              <Text className='text-xs text-gray-500'>
                <Text className='text-green-500'>{rating}</Text> . {genre}
              </Text>
            </View>
            <View className='flex-row items-center space-x-1'>
              <Icons.LocationMarkerIcon size={20} color='gray' opacity={0.4} />
              <Text className='text-xs text-gray-500'>{address}</Text>
            </View>
          </View>

          <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
        </View>

        <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
          <Icons.QuestionMarkCircleIcon color='gray' size={20} opacity={0.6} />
          <Text className='pl-2 flex-1 text-md font-bold'>Have a food allergy?</Text>
          <Icons.ChevronRightIcon size={20} color='#00ccbb' />
        </TouchableOpacity>
      </View>

      <View>
        <Text className='pt-6 font-bold px-4 mb-3 text-xl'>Menu</Text>

        {/* Dishes */}
        {dishes.map(dish => (
          <DishRow
            key={dish?._id}
            id={dish?._id}
            name={dish?.name}
            description={dish?.short_description}
            price={dish?.price}
            image={dish?.image}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default RestaurantScreen
