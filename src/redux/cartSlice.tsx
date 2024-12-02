import {  createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { TSushiItem } from "./sushiSlice"


export type ICartSlice = {
    itemsCart: TSushiItem[] | null,
    totalPrice: number,
    totalItems: number,
}

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

           if(state.itemsCart?.find((item) => item.id.includes(action.payload.id))) {
                //@ts-ignore
            state.itemsCart.find((item) => item.id.includes(action.payload.id)).count = action.payload.count;
           } 
            else {
                //@ts-ignore
            state.itemsCart.push(action.payload) 
                }

                            //@ts-ignore
            state.totalPrice += action.payload.price * action.payload.count 
            //@ts-ignore
             state.totalItems += action.payload.count
      
          },

          deleteItem: (state, action: PayloadAction<TSushiItem>) => {
            //@ts-ignore
           state.itemsCart = state.itemsCart.filter((item) => item.id !== action.payload.id)
             //@ts-ignore
           state.totalPrice -= action.payload.price* action.payload.count
               //@ts-ignore
           state.totalItems -= action.payload.count
           
          },

          deleteAllItems: (state) => {
            state.itemsCart = [];
            state.totalPrice = 0;
            state.totalItems = 0;
          },

          addOneItem: (state, action: PayloadAction <TSushiItem>) => {
            //@ts-ignore
            let  item = state.itemsCart.find((item) => item.id === action.payload.id)
            //@ts-ignore
                item.count = item.count + 1;
                   //@ts-ignore
                state.totalPrice+= item?.price
                //@ts-ignore
                state.totalItems+=1
            
          },

          deleteOneItem: (state, action : PayloadAction <TSushiItem>) => {
              //@ts-ignore
            let  item = state.itemsCart.find((item) => item.id === action.payload.id)
            //@ts-ignore
            if (item.count > 0) {
              //@ts-ignore
              item.count = item?.count -1;
              //@ts-ignore
              state.totalPrice-= item?.price
              state.totalItems-=1
            }
       

          }
      },
    })
  



export const cartSelector = (state: RootState) => state.cart
export const {addItem, deleteItem, deleteAllItems, addOneItem, deleteOneItem} = cartSlice.actions

export default cartSlice.reducer
  