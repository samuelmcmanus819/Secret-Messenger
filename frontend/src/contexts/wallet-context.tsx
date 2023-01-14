import { createContext, useContext, useState } from "react";
import { SecretNetworkClient } from "secretjs";
import { WalletContextProviderPropsType, WalletContextType } from "types/wallet.types";

const walletContextDefaultValues: WalletContextType = {
  wallet: new SecretNetworkClient({ url: '', chainId: '' }),
  login: (wallet: SecretNetworkClient) => { },
  logout: () => { }
}
const WalletContext = createContext<WalletContextType>(walletContextDefaultValues);

export const useWallet = () => {
   return useContext(WalletContext);
}
export const WalletProvider = ({ children }: WalletContextProviderPropsType) => {
  const [wallet, setWallet] = useState<SecretNetworkClient>(new SecretNetworkClient({ url: '', chainId: '' }));

  const login = (wallet: SecretNetworkClient) => {
    setWallet(wallet);
  }
  const logout = () => {
    setWallet(new SecretNetworkClient({ url: '', chainId: '' }));
  }
  const value = {
    wallet,
    login,
    logout
  }
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}