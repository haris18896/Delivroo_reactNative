# Delivroo_reactNative : Restaurant Screen and Navigation

Now here we are going to build a restaurant screen and will navigate to that page by clicking on restaurant.

for this purpose we are going to use `useNavigation` hook from `react-navigation/native`

```js
// Restaurant Card
  const navigation = useNavigation()

<TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          rating,
          title,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
      }}
      className='bg-white mr-3 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-md w-64'
    ></TouchableOpacity>
```

```js
// App.js
          <Stack.Screen name='Restaurant' component={RestaurantScreen} />
```

* Notice that in the RestaurantCard we are navigating to the `Restaurant` which is a key name in the `App.js`, and in the `navigation.navigate('Restaurant', {<params>})` we pass params to the `RestaurantScreen` and to pull those `params` in the RestaurantScreen we have to use `useRoute` hook.

```js
//RestaurantsScreen.js
import { useRoute } from '@react-navigation/native'

  const route = useRoute()
```

so to do it better we can do `const route.params = useRoute()` and after 'route.params' we can access any params that we have passed, so the best way is to destructure the params in the route, see below

```js
const {
    params: { id, imgUrl, rating, title, genre, address, short_description, dishes, long, lat },
  } = useRoute()
```

```js
// RestaurantsScreen.js

import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const RestaurantScreen = () => {
  const {
    params: { id, imgUrl, rating, title, genre, address, short_description, dishes, long, lat },
  } = useRoute()
  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}

export default RestaurantScreen
```

* to format currency we are going to install a package `react currency formatter`
  ```
  npm i react-currency-format
  ```

