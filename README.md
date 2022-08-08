# Delivroo_reactNative : Sanity Integration

Now we are going to add Sanity to our app.

[Sanity](https://snaity.io/sonny) is a platform that allows us to create and manage content.

```
npm install -g @sanity/cli
sanity init --coupon sonny2022
```

after that it will ask us some question which are answered below

```
? Project name: delivroo_reactnative
? Use the default dataset configuration? Yes
? Project output path: sanity
? Select project template Blog (schema)
```

after that it will be installing packages and dependencies, also take a look at the output. if you want to install dependencies in the sanity then do change the directory because sanity has it's own `package.json` file.

after all the dependencies installed we will get a UI to manage.

after that Login to sanity, and there you will see your sanity project.

after that `cd sanity` change directory to sanity and start it `sanity start`

in the sanity directory you will see a `Schemas` directory. where all the schemas for our data base will be present, and each schema has it's own file.

Now we are going to make a schema. the first thing we are going to make is `RestaurantSchema` for that go to the schemas directory and edit the blog schemas as you want.

here we are going to change the `post` schema to `Restaurant` schema.

```js
// restaurantSchema
export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurant Name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: Rule => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Restaurant',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Restaurant',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longitude of the Restaurant',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address of the Restaurant',
      validation: Rule => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a rating for the form (1-5 stars)',
      validation: Rule => Rule.required().min(1).max(5).error('Please enter a value between 1 and 5'),
    },
    {
      name: 'type',
      type: 'reference',
      title: 'Category',
      validation: Rule => Rule.required(),
      to: [{ type: 'category' }],
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }],
    },
  ],
}

```

```js
// category Schema
export default {
  name: 'category',
  title: 'Menu Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Category Name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the category',
    },
  ],
}

```

```js
// dish Schema
export default {
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of the Dish',
      validation: Rule => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: Rule => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Dish',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price of the Dish in GBP',
    },
  ],
}
```

```js
// Featured Schema
export default {
  name: 'featured',
  title: 'Featured Menu Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Category Name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: Rule => Rule.max(200),
    },
    {
      name: 'restaurant',
      type: 'array',
      title: 'Restaurant',
      of: [{ type: 'reference', to: [{ type: 'restaurant' }] }],
    },
  ],
}

```

```js
// schema.js
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import category from './category'
import restaurant from './restaurant'
import dish from './dish'
import featured from './featured'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([restaurant, dish, category, featured]),
})

```

* To start the Sanity Server `sanity start`

after starting the server we are going to add all the data in the dataTable and after that we will be integrating this backend to our front end.