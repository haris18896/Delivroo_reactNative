import store from './redux/store'
import HomeScreen from './screens/Home/HomeScreen'
import BasketScreen from './screens/basket/BasketScreen'
import RestaurantScreen from './screens/restaurant/RestaurantScreen'

import { Provider } from 'react-redux'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PreparingOrderScreen from './screens/preaparingOrder/PreparingOrderScreen'
import DeliveryScreen from './screens/delivery/DeliveryScreen'

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
            <Stack.Screen
              name='PreparingOrderScreen'
              component={PreparingOrderScreen}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />

            <Stack.Screen
              name='Delivery'
              component={DeliveryScreen}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  )
}
