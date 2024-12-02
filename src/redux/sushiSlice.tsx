import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import axios from "axios"

export enum status {
  LOADING = 'loading',
  SUCCSEC = 'succses',
  ERROR = 'error'
}

export type TSushiItem = {
  id: string,
  imageUrl: string,
  title: string,
  weight: string,
  price: number,
  category: number,
  descr: string,
  count?: number
}

export type ISushiSlice = {
  items : TSushiItem[] | null,
  searchValue: string | null,
  categoriesId: number,
  currentPage: number,
  isLoading: boolean,
  status: status

}

const initialState: ISushiSlice = {
  items: [],
  searchValue: null,
  categoriesId: 0,
  currentPage: 1,
  isLoading: false,
  status: status.LOADING

}

export const fetchSushi = createAsyncThunk ( 
  'sushi/fetchSushi',
  async (url: any, thunkApi) => {
      const {data} = await axios.get(url);
      return data;
    
  }
)



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
      }


    },  extraReducers : (builder) =>  {
      builder.addCase(fetchSushi.pending, (state) => {
          state.status = status.LOADING;
      }),

      builder.addCase(fetchSushi.fulfilled, (state, action) => {
          state.items = action.payload;
          state.status = status.SUCCSEC
      }),
      builder.addCase(fetchSushi.rejected, (state) => {
          state.status = status.ERROR
      })
    }
  })

  export const sushiSelector = (state: RootState) => state.sushi
  
  // Action creators are generated for each case reducer function
  export const {getSushi, setSearchValue, setCategoryId, setCurrentPage, clearSearchValue } = sushiSlice.actions
  export default sushiSlice.reducer

