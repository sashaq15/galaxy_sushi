import {  createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { TSushiItem } from "../sushi/types"
import { ICartSlice } from "./types"

const initialState: ICartSlice = { 
    itemsCart : [],
    totalPrice: 0,
    totalItems: 0,
}

export const cartSlice = createSlice({
      name: 'cart',
      initialState,
      reducers: {
        addItem: (state, action : PayloadAction<TSushiItem>) => {
          const findItem = state.itemsCart.find((item) => item.id === action.payload.id);

          if(findItem) {
           findItem.count = findItem.count + action.payload.count;
           } else state.itemsCart.push(action.payload);

          state.totalPrice += action.payload.price * action.payload.count 
          state.totalItems += action.payload.count
          
          },
          deleteItem: (state, action: PayloadAction<TSushiItem>) => {
           state.itemsCart = state.itemsCart.filter((item) => item.id !== action.payload.id)
           state.totalPrice -= action.payload.price* action.payload.count
           state.totalItems -= action.payload.count
          },

          deleteAllItems: (state) => {
            state.itemsCart = [];
            state.totalPrice = 0;
            state.totalItems = 0;
          },
          addOneItem: (state, action: PayloadAction <TSushiItem>) => {
            const  findItem = state.itemsCart.find((item) => item.id === action.payload.id)
                if(findItem) {
                  findItem.count +=1;
                  state.totalPrice+= findItem?.price
                  state.totalItems+=1
                }
          },
          deleteOneItem: (state, action : PayloadAction <TSushiItem>) => {
            const  findItem = state.itemsCart.find((item) => item.id === action.payload.id)
            if (findItem && findItem.count > 0) {
              findItem.count = findItem?.count -1;
              state.totalPrice-= findItem?.price
              state.totalItems-=1
            }
          }
      },
    })
  



export const cartSelector = (state: RootState) => state.cart
export const {addItem, deleteItem, deleteAllItems, addOneItem, deleteOneItem} = cartSlice.actions

export default cartSlice.reducer
  