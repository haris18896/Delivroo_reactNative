import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { urlFor } from '../../sanity'
import * as Icons from 'react-native-heroicons/solid'

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = React.useState(false)

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && ' border-b-0'}`}
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
                border: '1 #f3f3f4',
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
            <TouchableOpacity>
              <Icons.MinusCircleIcon size={40} color='#00ccbb' />
            </TouchableOpacity>

            <Text>0</Text>

            <TouchableOpacity>
              <Icons.PlusCircleIcon size={40} color='#00ccbb' />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow
