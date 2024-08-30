import { configureStore } from '@reduxjs/toolkit'
import sushi from './sushiSlice'



export const store =  configureStore({
  reducer: {
    sushi
  }
})

export type RootState = ReturnType<typeof store.getState>

