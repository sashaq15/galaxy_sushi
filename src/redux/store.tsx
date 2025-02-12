import { configureStore } from '@reduxjs/toolkit'
import sushi from './sushi/slice'
import cart from './cart/slice'




export const store =  configureStore({
  reducer: {
    sushi,
    cart,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

