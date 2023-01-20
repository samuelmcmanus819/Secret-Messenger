import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UsersState, UserType } from "types/user.types";

const initialState: UsersState = {
  users: [],
  chosenUser: { name: '', address: '' }
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload
    },
    chooseUser: (state, action: PayloadAction<UserType>) => {
      state.chosenUser = action.payload
    },
    deselectUser: (state) => {
      state.chosenUser = { name: '', address: '' }
    }
  }
})

export const { updateUsers, chooseUser, deselectUser } = usersSlice.actions;
export default usersSlice.reducer;