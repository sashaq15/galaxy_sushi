import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

export type TSushiItem = {
  id: string,
  imageUrl: string,
  title: string,
  weight: string,
  price: number,
  category: number,
  descr?: string
}

export type ISushiSlice = {
  items : TSushiItem[] | null,
  searchValue: string,
  categoriesId: number,
  currentPage: number,
  isLoading: boolean

}

const initialState: ISushiSlice = {
  items: [],
  searchValue: '',
  categoriesId: 0,
  currentPage: 1,
  isLoading: false

}






export const sushiSlice = createSlice({
    name: 'sushi',
    initialState,
    reducers: {
      getSushi: (state, action : PayloadAction<TSushiItem[]>) => {
        state.items = action.payload
      },
      setSearchValue: (state, action: PayloadAction<string>) => {
        state.searchValue = action.payload
      },
      clearSearchValue : (state, action: PayloadAction <string>) => {
        state.searchValue = action.payload
      },
      setCategoryId: (state, action: PayloadAction<number>) => {
        state.categoriesId = action.payload
      },
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload
      },
      setIsLoading:(state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
      }

    }
  })

  export const sushiSelector = (state: RootState) => state.sushi
  
  // Action creators are generated for each case reducer function
  export const {getSushi, setSearchValue, setCategoryId, setCurrentPage, setIsLoading, clearSearchValue } = sushiSlice.actions
  export default sushiSlice.reducer

