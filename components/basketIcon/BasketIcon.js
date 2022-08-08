import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../../redux/features/basketSlice'
import CurrencyFormat from 'react-currency-format'

const BasketIcon = () => {
  const navigation = useNavigation()
  const basketTotal = useSelector(selectBasketTotal)
  const items = useSelector(selectBasketItems)

  if (items.length === 0) return null

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className='bg-[#00ccbb] p-4 mx-5 rounded-lg flex-row items-center space-x-2'
      >
        <Text className='text-white font-extrabold text-lg bg-[#01a296] py-1 px-2'>{items.length}</Text>
        <Text className='flex-1 text-white font-extrabold text-lg text-center'>View Basket</Text>
        <CurrencyFormat
          value={basketTotal.toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          thousandSpacing='2'
          prefix={'£ '}
          renderText={value => <Text className='text-lg text-white font-extrabold'>{value}</Text>}
        />
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon
