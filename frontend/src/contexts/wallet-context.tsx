import { createContext, useContext, useState } from "react";
import { SecretNetworkClient } from "secretjs";
import { WalletContextProviderPropsType, WalletContextType } from "types/wallet.types";

const walletContextDefaultValues: WalletContextType = {
  wallet: new SecretNetworkClient({ url: '', chainId: '' }),
  username: '',
  login: (wallet: SecretNetworkClient) => { },
  logout: () => { },
  setUsername: () => { }
}
const WalletContext = createContext<WalletContextType>(walletContextDefaultValues);

export const useWallet = () => {
   return useContext(WalletContext);
}
export const WalletProvider = ({ children }: WalletContextProviderPropsType) => {
  const [wallet, setWallet] = useState<SecretNetworkClient>(new SecretNetworkClient({ url: '', chainId: '' }));
  const [username, setUsername] = useState<string>('');

  const login = (wallet: SecretNetworkClient) => {
    setWallet(wallet);
  }
  const logout = () => {
    setWallet(new SecretNetworkClient({ url: '', chainId: '' }));
  }

  const value = {
    wallet,
    username,
    login,
    logout,
    setUsername
  }
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}