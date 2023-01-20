import { SecretNetworkClient } from "secretjs";

export type WalletState = {
  signingClient: SecretNetworkClient,
  username: string,
  userRegistered: boolean
}