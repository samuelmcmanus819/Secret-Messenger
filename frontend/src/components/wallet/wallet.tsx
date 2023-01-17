import { useState } from 'react'
import { useWallet } from 'contexts/wallet-context';
import { connectKeplrWallet, connectLeapWallet } from "components/wallet/wallet-login";
import { registerUser, getUsername } from 'components/registration/registration';
import RegistrationForm from 'components/registration/registration-form';

const Wallet = () => {
  const [connecting, setConnecting] = useState(false);
  const [userRegistered, setUserRegistered] = useState(true);
  const [error, setError] = useState('');
  const { username, wallet, login, logout, setUsername } = useWallet();

  const connectClicked = () => {
    setConnecting(true)
  }

  const connectLeapClicked = () => {
    connectLeapWallet().then(wallet => { 
      if(wallet) { 
        login(wallet);
        getUsername(wallet).then(name => { 
          if (name != ''){
            setUsername(name);
            setUserRegistered(true);
          } else{
            setUserRegistered(false)
          }
        }); 
      } 
    });
    setConnecting(false);
  }

  const connectKeplrClicked = () => {
    connectKeplrWallet().then(wallet => { 
      if(wallet) { 
        login(wallet);
        getUsername(wallet).then(name => { 
          if (name != ''){
            setUsername(name);
            setUserRegistered(true);
          } else{
            setUserRegistered(false)
          }
        });
      } 
    });
    setConnecting(false);
  }

  const disconnectWallet = () => {
    logout();
    setConnecting(false);
  }

  const submitRegistrationForm = (username: string) => {
    registerUser(wallet, username).then(res => {
      if(res != 'Username already taken' && res != 'Your wallet is already registered'){
        getUsername(wallet).then(name => { 
          if (name != ''){
            setUsername(name);
            setUserRegistered(true);
          } else{
            setError('Registration failed');
          }
        });
      } else{
        setError(res);
      }
    });
  }

  return (
    <div className="flex h-full w-full justify-center">
      <button className="self-end bg-primary-ultralight mb-4 text-sm text-dark-text w-[120px] h-[35px] rounded-md overflow-hidden" 
            onClick={wallet.address == "" ? connectClicked : disconnectWallet}>
        {username== "" ? 'Connect Wallet': username}
      </button>
      <span className={`${connecting ? 'w-96 h-52 bg-primary-ultralight fixed top-[100px] left-[60px] z-5 shadow-[0px_5px_7.5px_rgba(0,0,0,0.20)]' : 'w-0 h-0' }`}>
        <button onClick={connectLeapClicked}>{connecting ? 'Connect Leap' : ''}</button>
        <button onClick={connectKeplrClicked}>{connecting ? 'Connect Keplr' : ''}</button>
      </span>
      <span className={`${userRegistered ? 'w-0 h-0' : 'w-96 h-52 bg-primary-ultralight fixed top-[100px] left-[60px] z-5 shadow-[0px_5px_7.5px_rgba(0,0,0,0.20)]'}`}>
        {!userRegistered && <RegistrationForm submitForm={submitRegistrationForm}/>}
      </span>
    </div>
    
  )
}

export default Wallet;