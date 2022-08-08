# Delivroo_reactNative : Redux
```js
// store.js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

export default store

```

```js
// basketSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      state.value -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

//Selector: access the global store and pull the items out from the basket store
export const selectBasketItems = state => state.basket.items
export const selectBasketItemsWithId = (state, id) => state.basket.items.filter(item => item.id === id)

export default basketSlice.reducer


```