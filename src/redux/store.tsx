import { configureStore } from '@reduxjs/toolkit'
import sushi from './sushiSlice'
import cart from './cartSlice'



export const store =  configureStore({
  reducer: {
    sushi,
    cart
  }
})

export type RootState = ReturnType<typeof store.getState>

