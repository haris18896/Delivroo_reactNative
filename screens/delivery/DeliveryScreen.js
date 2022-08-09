import React from 'react'
import { useSelector } from 'react-redux'
import * as Icons from 'react-native-heroicons/solid'
import { View, Text, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../../redux/features/restaurantSlice'
import { TouchableOpacity } from 'react-native-web'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)

  return (
    <View className='bg-[#00ccbb]'>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icons.XIcon color='white' size={30} />
          </TouchableOpacity>
          <Text>Order Help</Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen
