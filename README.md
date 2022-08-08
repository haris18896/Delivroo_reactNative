# Delivroo_reactNative : Connecting Sanity to our Front End

Now we are going to Integrate our Sanity backend to our front end app. and for that we are going to install `Sanity-client`

```
npm i @sanity/client @sanity/image-url
```

after installing the above dependencies we are going to create `sanity.js` file at the root level. here is all the magic happens.

also add `cors police` to your app, which can be done

```
cd sanity
sanity cors add http://localhost:3000
``` 

or you can add it by going to the [sanityAPI](https://www.sanity.io/manage/personal/project/voaq66f7/api)

```js
// sanity.js
import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
  projectId: 'voaq66f7',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',
})

const builder = imageUrlBuilder(client)
export const urlFor = source => builder.image(source)

export default client
```

# Deploying Sanity

To deploy sanity, it's really easy `sanity deploy`

* then it will ask the following questions.

* * Studio hostname (<value>.sanity.studio): delivrooreactnative
> Success! Studio deployed to https://delivrooreactnative.sanity.studio/
> 
> Now I can login to this backend cms from anywhere in the world.
> 
> if you make any changes to your backend then you will have to redeploy the studio again.

---
---

# Query Information form sanity backend

go to the vision tab in localhost:3333 for sanity to check the queries.

To pull information form Sanity we are going to use Grock syntax.

Grock is similar to GraphQL syntax.
in this you say what you want, and you only specify the fields you want it will give you back the information.

```sql
*[_type == 'featured'] {
  ...
}
```

the above query will fetch everything from the `featured`.

```sql
*[_type == 'featured'] {
  ...,
  restaurant[] -> {
    ...,
    dishes[]->,
    type-> {
      name
    }
    
  }
}[0]
```

to see the images from the sanity, pass the image to the url builder of sanity
```js
// sanity.js
const builder = imageUrlBuilder(client)
export const urlFor = source => builder.image(source)
```

```js
// anywhere in the app, where sanity image url is being used
      <Image source={{ uri: urlFor(imgUrl).url }} className='h-36 w-64 rounded-md' />
```

---
---

# Fetching from sanity

checkout the useEffect in the FeaturedRow component, which shows how we are fetching the data from Sanity.

```js
// FeaturedRow.js
import React, { useEffect, useState } from 'react'
import * as Icons from 'react-native-heroicons/solid'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import RestaurantCard from '../restaurantCard/RestaurantCard'
import sanityClient from '../../sanity'

const FeaturedRow = ({ id, title, description }) => {
  const [loading, setLoading] = useState(false)
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    setLoading(true)
    sanityClient
      .fetch(
        `
        *[_type == 'featured' && _id == '${id}'] {
          ...,
          restaurant[]->{
            ...,
            dishes[]->,
            type-> {
              name
            }
          }
        }[0]
    `,
        { id } // params
      )
      .then(data => {
        setRestaurants(data?.restaurant)
        setLoading(false)
      })
  }, [id])

  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <Icons.ArrowRightIcon size={20} color='#00ccbb' />
      </View>
      <Text className='text-xs text-gray-500 px-4'>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
        {/* Restaurant Card.... */}
        {loading ? (
          <View className='flex-1 mt-10 justify-center items-center'>
            <ActivityIndicator size='large' color='#00ccbb' />
          </View>
        ) : (
          restaurants?.map(restaurant => (
            <RestaurantCard
              key={restaurant?._id}
              id={restaurant?._id}
              imgUrl={restaurant?.image}
              address={restaurant?.address}
              title={restaurant?.name}
              rating={restaurant?.rating}
              genre={restaurant?.type?.name}
              short_description={restaurant?.short_description}
              dishes={restaurant?.dishes}
              long={restaurant?.long}
              lat={restaurant?.lat}
            />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow
```