import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { urlFor } from '../../sanity'
import * as Icons from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, selectBasketItemsWithId, removeFromBasket } from '../../redux/features/basketSlice'

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = React.useState(false)
  const dispatch = useDispatch()

  const items = useSelector(state => selectBasketItemsWithId(state, id))

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }))
  }

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return

    dispatch(removeFromBasket({ id }))
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-100 ${isPressed && ' border-b-0'}`}
      >
        <View className='flex-row items-center'>
          <View className='flex-1 pr-2'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400'>{description}</Text>
            <CurrencyFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              suffix={'  GBP'}
              renderText={value => <Text className='text-gray-400 mt-2'>{value}</Text>}
            />
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className='h-20 w-20 p-4 bg-gray-300 rounded-full'
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className='bg-white px-4'>
          <View className='flex-row items-center space-x-2 pb-3'>
            <TouchableOpacity disabled={!items.length} onPress={() => removeItemsFromBasket()}>
              <Icons.MinusCircleIcon size={40} color={items.length > 0 ? '#00ccbb' : 'gray'} />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={() => addItemToBasket()}>
              <Icons.PlusCircleIcon size={40} color='#00ccbb' />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow
