import { ReactNode } from "react";
import { SecretNetworkClient } from "secretjs";

export type WalletContextType = {
  wallet: SecretNetworkClient;
  username: string;
  login: (wallet: SecretNetworkClient) => void;
  logout: () => void;
  setUsername: (username: string) => void;
}

export type WalletContextProviderPropsType = {
  children: ReactNode;
}