import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import {
  collection,
  getDocs,
  query,
  where,
  startAfter,
  limit
} from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { FetchSushiArgs, ISushiSlice, TSushiItem, status } from "./types"

const initialState: ISushiSlice = {
  items: [],
  searchValue: null,
  categoriesId: 0,
  currentPage: 1,
  isLoading: false,
  status: status.LOADING
}

export const sushiSlice = createSlice({
  name: "sushi",
  initialState,
  reducers: {
    getSushi: (state, action: PayloadAction<TSushiItem[]>) => {
      state.items = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    clearSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoriesId = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSushiFirestore.pending, (state) => {
      state.status = status.LOADING
    }),
      builder.addCase(fetchSushiFirestore.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = status.SUCCSEC
      }),
      builder.addCase(fetchSushiFirestore.rejected, (state) => {
        state.status = status.ERROR
      })
  }
})

let lastVisible: any = null

export const fetchSushiFirestore = createAsyncThunk<
  TSushiItem[],
  FetchSushiArgs,
  { rejectValue: string }
>(
  "sushi/fetchSushiFirestore",
  async ({ categoriesId, currentPage, limitValue }, thunkApi) => {
    try {
      const sushiCollection = collection(db, "sushi")
      let sushiQuery = query(sushiCollection)

      if (categoriesId > 0) {
        sushiQuery = query(sushiQuery, where("category", "==", categoriesId))
      }

      if (currentPage > 1 && lastVisible) {
        sushiQuery = query(
          sushiQuery,
          startAfter(lastVisible),
          limit(limitValue)
        )
      } else {
        sushiQuery = query(sushiQuery, limit(limitValue))
      }

      const sushiSnapshot = await getDocs(sushiQuery)
      const data: TSushiItem[] = sushiSnapshot.docs.map((doc) => ({
        ...(doc.data() as TSushiItem)
      }))

      lastVisible = sushiSnapshot.docs[sushiSnapshot.docs.length - 1]

      return data.length > 0 ? data : []
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

export const sushiSelector = (state: RootState) => state.sushi
export const {
  getSushi,
  setSearchValue,
  setCategoryId,
  setCurrentPage,
  clearSearchValue
} = sushiSlice.actions
export default sushiSlice.reducer
