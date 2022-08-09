# Delivroo_reactNative : Placing Order Screen

The common components View, Text and Image are precomposed and exposed under the Animatable namespace. If you have your own component that you wish to animate, simply wrap it with a Animatable.View or compose it with:

after that we are going to add `progress bar`
```
npm i react-native-animatable
npm i react-native-progress
```

```js
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'

const PreparingOrderScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery')
    }, 6000)
  }, [])

  return (
    <SafeAreaView className='bg-[#fff] flex-1 justify-center items-center'>
      <Animatable.Image
        source={require('../../assets/images/mobile.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='h-96 w-96'
      />
      <Animatable.Text animation='slideInUp' iterationCount={1} className='text-lg text-[#00ccbb] font-bold text-center'>
        Waiting for Restaurant to accept Order!
      </Animatable.Text>

      <Progress.Circle className='mt-10' size={60} indeterminate={true} color='#00ccbb' />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen
```

After that we are going to add `ReactNative Maps` [MapView: ReactNative Maps](https://docs.expo.dev/versions/latest/sdk/map-view/)

```
npm i react-native-maps
```