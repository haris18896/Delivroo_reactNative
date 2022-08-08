# Delivroo_reactNative : Basket Popup and Basket Screen

```js
// BasketIcon.js
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

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        onPress={navigation.navigate('Basket')}
        className='bg-[#00ccbb] p-4 mx-5 rounded-lg flex-row items-center space-x-2'
      >
        <Text className='text-white font-extrabold text-lg bg-[#01a296] py-1 px-2'>{items.length}</Text>
        <Text className='flex-1 text-white font-extrabold text-lg text-center'>View Basket</Text>
        <CurrencyFormat
          value={basketTotal}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'£ '}
          renderText={value => <Text className='text-lg text-white font-extrabold'>{value}</Text>}
        />
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon

```

```js
// App.js
import store from './redux/store'
import HomeScreen from './screens/Home/HomeScreen'
import BasketScreen from './screens/basket/BasketScreen'
import RestaurantScreen from './screens/restaurant/RestaurantScreen'

import { Provider } from 'react-redux'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            {/* Screens */}
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Restaurant' component={RestaurantScreen} />
            <Stack.Screen
              name='Basket'
              component={BasketScreen}
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  )
}
```