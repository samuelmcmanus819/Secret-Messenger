import { useState } from 'react'
import { useWallet } from 'components/wallet/wallet-context';
import { connectKeplrWallet, connectLeapWallet } from "./wallet-login";

const Wallet = () => {
  const [connecting, setConnecting] = useState(false);
  const { wallet, login, logout } = useWallet();

  const connectClicked = () => {
    setConnecting(true)
  }

  const connectLeapClicked = () => {
    connectLeapWallet().then(wallet => { if(wallet) { login(wallet) } });
    setConnecting(false);
  }

  const connectKeplrClicked = () => {
    connectKeplrWallet().then(wallet => { if(wallet) { login(wallet) } });
    setConnecting(false);
  }

  const disconnectWallet = () => {
    logout();
    setConnecting(false);
  }

  return (
    <div className="flex h-full w-full justify-center">
      <button className="self-end bg-primary-ultralight mb-4 text-sm text-dark-text w-[120px] h-[35px] rounded-md overflow-hidden" 
            onClick={wallet.address == "" ? connectClicked : disconnectWallet}>
        {wallet.address == "" ? 'Connect Wallet': wallet.address}
      </button>
      <span className={`${connecting ? 'w-96 h-52 bg-primary-ultralight fixed top-[100px] left-[60px] z-5 shadow-[0px_5px_7.5px_rgba(0,0,0,0.20)]' : 'w-0 h-0' }`}>
        <button onClick={connectLeapClicked}>{connecting ? 'Connect Leap' : ''}</button>
        <button onClick={connectKeplrClicked}>{connecting ? 'Connect Keplr' : ''}</button>
      </span>
    </div>
    
  )
}

export default Wallet;