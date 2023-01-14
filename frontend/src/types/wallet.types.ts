import { SecretNetworkClient } from "secretjs";

export type WalletContextType = {
  wallet: SecretNetworkClient;
  login: (wallet: SecretNetworkClient) => void;
  logout: () => void;
}
