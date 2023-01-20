import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WalletState } from "types/wallet.types";
import { SecretNetworkClient } from "secretjs";

const initialState: WalletState = {
  signingClient: new SecretNetworkClient({ url: '', chainId: process.env.NEXT_PUBLIC_CHAIN_ID ?? '' }),
  username: '',
  userRegistered: true
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connect: (state, action: PayloadAction<SecretNetworkClient>) => {
      state.signingClient = action.payload;
    },
    disconnect: (state) => {
      state.signingClient = new SecretNetworkClient({ url: '', chainId: process.env.NEXT_PUBLIC_CHAIN_ID ?? '' });
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserRegistered: (state, action: PayloadAction<boolean>) => {
      state.userRegistered = action.payload;
    }
  }
})

export const { connect, disconnect, setUsername, setUserRegistered } = walletSlice.actions;
export default walletSlice.reducer;