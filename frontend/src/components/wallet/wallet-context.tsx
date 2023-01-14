import { createContext, ReactNode, useContext, useState } from "react";
import { SecretNetworkClient } from "secretjs";

//Set up the wallet context
interface walletContextType {
  wallet: SecretNetworkClient;
  login: (wallet: SecretNetworkClient) => void;
  logout: () => void;
}
const walletContextDefaultValues: walletContextType = {
  wallet: new SecretNetworkClient({ url: '', chainId: '' }),
  login: (wallet: SecretNetworkClient) => { },
  logout: () => { }
}
const WalletContext = createContext<walletContextType>(walletContextDefaultValues);

export const useWallet = () => {
   return useContext(WalletContext);
}

//Set up the context provider
interface props {
  children: ReactNode;
}
export const WalletProvider = ({ children }: props) => {
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