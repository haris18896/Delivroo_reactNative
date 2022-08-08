import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../../redux/features/restaurantSlice'
import { selectBasketItems, selectBasketTotal } from '../../redux/features/basketSlice'
import * as Icons from 'react-native-heroicons/solid'
import { urlFor } from '../../sanity'
import CurrencyFormat from 'react-currency-format'
import { removeFromBasket } from '../../redux/features/basketSlice'

const BasketScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])

  useMemo(() => {
    // if the values of the items didn't changed then it will not recompute the value
    const groupedItems = items.reduce((results, item) => {
      ;(results[item.id] = results[item.id] || []).push(item)
      return results
    }, {})

    setGroupedItemsInBasket(groupedItems)
  }, [items])

  return (
    <SafeAreaView className='pt-10 flex-1 bg-white'>
      <View className='flex-1 bg-gray-100 '>
        <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'> Basket</Text>
            <Text className='text-center text-gray-400'>{restaurant.title}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack} className='rounded-full bg-gray-100 absolute top-3 right-5'>
            <Icons.XCircleIcon color='#00ccbb' size={50} />
          </TouchableOpacity>
        </View>

        <View className='flex-row space-x-2 items-center px-4 py-3 bg-white my-5'>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
          />
          <Text className='flex-1'>Deliver in 50 - 75 mints</Text>
          <TouchableOpacity>
            <Text className='text-[#00ccbb]'>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            return (
              <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                <Text className='text-[#00ccbb]'>{items.length} x</Text>
                <Image
                  source={{
                    uri: urlFor(items[0]?.image).url(),
                  }}
                  className='h-12 w-12 rounded-full'
                />
                <Text className='flex-1'>{items[0]?.name}</Text>
                <CurrencyFormat
                  value={items[0]?.price.toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'£ '}
                  renderText={value => <Text className='text-gray-400 mt-2'>{value}</Text>}
                />

                <TouchableOpacity>
                  <Text className='text-[#00ccbb] text-xs' onPress={() => dispatch(removeFromBasket({ id: key }))}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>SubTotal</Text>
            <CurrencyFormat
              value={basketTotal.toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'£ '}
              renderText={value => <Text className='text-gray-400'>{value}</Text>}
            />
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <CurrencyFormat
              value={(5.99).toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'£ '}
              renderText={value => <Text className='text-gray-400'>{value}</Text>}
            />
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Order Total</Text>
            <CurrencyFormat
              value={(5.99 + basketTotal).toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'£ '}
              renderText={value => <Text className='text-black font-extrabold'>{value}</Text>}
            />
          </View>

          <TouchableOpacity className='rounded-lg bg-[#00ccbb] p-4'>
            <Text className='text-center text-white text-xl'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen
