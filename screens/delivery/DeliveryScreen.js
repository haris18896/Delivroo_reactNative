import React from 'react'
import { useSelector } from 'react-redux'
import * as Icons from 'react-native-heroicons/solid'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../../redux/features/restaurantSlice'
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)

  return (
    <View className='bg-[#00ccbb] flex-1'>
      <SafeAreaView className='z-50 mt-10'>
        <View className='flex-row justify-between items-center p-5'>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icons.XCircleIcon color='white' size={30} />
          </TouchableOpacity>
          <Text className='font-light text-white text-lg'>Order Help</Text>
        </View>

        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
              <Text className='text-3xl font-bold'>45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: 'https://links.papareact.com/fls',
              }}
              className='w-20 h-20'
            />
          </View>

          <Progress.Bar size={30} color='#00ccbb' indeterminate={true} />

          <Text className='mt-3 text-gray-400'>Your order at {restaurant.title} is being prepared</Text>
        </View>
      </SafeAreaView>

      <MapView
        region={{
          latitude: restaurant?.ltd,
          longitude: restaurant?.long,
          latitudeDelta: 0.0922, // zoom scale
          longitudeDelta: 0.0421,
        }}
        className='flex-1 z-0 mt-[-15px]'
        mapType='mutedStandard'
      >
        <Marker
          coordinate={{
            latitude: restaurant?.lat,
            longitude: restaurant?.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier='origin'
          pinColor='#00ccbb'
        />
      </MapView>
      <SafeAreaView className='bg-white flex-row items-center space-x-5 h-28'>
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className='h-12 w-12 bg-gray-300 p-4 rounded-full ml-5'
        />
        <View className='flex-1'>
          <Text className='text-lg'>Haris Ahmad Khan</Text>
          <Text className='text-gray-400'>Your Rider</Text>
        </View>
        <Text className='text-[#00ccbb] text-lg mr-5 font-bold'>Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen
