import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MessagesState, MessageType } from "types/message.types";

const initialState: MessagesState = {
  messages: [],
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    updateMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.messages = action.payload
    }
  }
})

export const { updateMessages } = messagesSlice.actions;
export default messagesSlice.reducer;