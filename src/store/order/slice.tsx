import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { TSushiItem } from "../sushi/types"


export type TOrder = {
    date: string,
    items: TSushiItem[]
}
export type TOrderSlice = {
    items: TOrder[] | null
}

const initialState: TOrderSlice = {
   items: null
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getUserOrders: (state, action: PayloadAction<TOrderSlice>) => {
      state.items = action.payload.items
    }
  },
})



export const orderSelector = (state: RootState) => state.order
export const { getUserOrders } = orderSlice.actions
export default orderSlice.reducer
