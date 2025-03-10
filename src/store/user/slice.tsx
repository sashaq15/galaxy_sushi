import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type  TUserSlice = {
    firstName: string
}

const initialState: TUserSlice = {
  firstName: '',
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    }
  },
})



export const userSelector = (state: RootState) => state.user
export const { getFirstName } = userSlice.actions
export default userSlice.reducer
