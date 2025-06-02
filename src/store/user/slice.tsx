import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type  TUserSlice = {
    firstName: string,
    isLoginOpen: boolean
}

const initialState: TUserSlice = {
  firstName: '',
  isLoginOpen: false
  
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    },
    openLogin :(state, action: PayloadAction<boolean>) => {
      state.isLoginOpen = action.payload
    }

  },
})



export const userSelector = (state: RootState) => state.user
export const { getFirstName, openLogin } = userSlice.actions
export default userSlice.reducer
