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
