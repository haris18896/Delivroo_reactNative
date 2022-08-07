import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Icons from 'react-native-heroicons/outline'
import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'

const Header = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  return (
    <SafeAreaView>
      <View className='flex-row pb-3 items-center mx-4 space-x-2'>
        {/* Header */}
        <View>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className='h-7 w-7 br-gray-300 p-4 rounded-full'
          />
        </View>
        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
          <Text className='font-bold text-lg '>
            Current Location
            <Icons.ChevronDownIcon size={20} color='#00CCBB' />
          </Text>
        </View>

        <Icons.UserIcon size={35} color='#00ccbb' />
      </View>

      {/* Search */}
      <View className='flex-row items-center space-x-2 mx-4 pb-3 border-radius-4'>
        <View className='flex-1 flex-row space-x-2 bg-gray-200 p-3 items-center rounded-md'>
          <Icons.SearchIcon color='gray' size={20} />
          <TextInput placeholder='Restaurants and Cuisines' keyboardType='default' />
        </View>
        <Icons.AdjustmentsIcon color='#00ccbb' size={20} />
      </View>
    </SafeAreaView>
  )
}

export default Header
