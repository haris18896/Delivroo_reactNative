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
