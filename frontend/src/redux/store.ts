import { configureStore } from '@reduxjs/toolkit'
import usersReducer from 'redux/usersSlice'
import messagesReducer from 'redux/messagesSlice'
import walletReducer from 'redux/walletSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    messages: messagesReducer,
    wallet: walletReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch