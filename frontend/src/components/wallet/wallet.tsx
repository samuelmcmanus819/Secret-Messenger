import { useState } from 'react'
import { connectKeplrWallet, connectLeapWallet } from "components/wallet/wallet-login";
import { registerUser, getUsername } from 'components/registration/registration';
import RegistrationForm from 'components/registration/registration-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { connect, disconnect, setUsername, setUserRegistered } from 'redux/walletSlice';

const Wallet = () => {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const wallet = useSelector((state: RootState) => state.wallet.signingClient);
  const username = useSelector((state: RootState) => state.wallet.username);
  const userRegistered = useSelector((state: RootState) => state.wallet.userRegistered);
  const dispatch = useDispatch();

  const connectClicked = () => {
    setConnecting(true)
  }

  const connectLeapClicked = () => {
    connectLeapWallet().then(wallet => { 
      if(wallet) { 
        dispatch(connect(wallet));
        getUsername(wallet).then(name => { 
          if (name != ''){
            dispatch(setUsername(name));
            dispatch(setUserRegistered(true));
          } else{
            dispatch(setUserRegistered(false));
          }
        }); 
      } 
    });
    setConnecting(false);
  }

  const connectKeplrClicked = () => {
    connectKeplrWallet().then(wallet => { 
      if(wallet) { 
        dispatch(connect(wallet));
        getUsername(wallet).then(name => { 
          if (name != ''){
            dispatch(setUsername(name));
            dispatch(setUserRegistered(true));
          } else{
            dispatch(setUserRegistered(false));
          }
        });
      } 
    });
    setConnecting(false);
  }

  const disconnectWallet = () => {
    dispatch(disconnect());
    dispatch(setUsername(''));
    setConnecting(false);
  }

  const submitRegistrationForm = (username: string) => {
    registerUser(wallet, username).then(res => {
      if(res != 'Username already taken' && res != 'Your wallet is already registered'){
        getUsername(wallet).then(name => { 
          if (name != ''){
            dispatch(setUsername(name));
            dispatch(setUserRegistered(true));
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
      <span className={`${connecting ? 'flex flex-col justify-center w-96 h-52 bg-primary-ultralight fixed top-[100px] left-[60px] z-5 shadow-[0px_5px_7.5px_rgba(0,0,0,0.20)] px-6' : 'w-0 h-0' }`}>
        <div className='flex flex-col w-full'>
          <button className={`${connecting ? 'my-4 border border-primary-main shadow-[0px_5px_7.5px_rgba(0,0,0,0.20)] z-6 h-16 text-xl' : ''}`} onClick={connectLeapClicked}>{connecting ? 'Connect Leap' : ''}</button>
          <button className={`${connecting ? 'my-4 border border-primary-main shadow-[0px_5px_7.5px_rgba(0,0,0,0.20)] z-6 h-16 text-xl' : ''}`} onClick={connectKeplrClicked}>{connecting ? 'Connect Keplr' : ''}</button>
        </div>
      </span>
      <span className={`${userRegistered ? 'w-0 h-0' : 'w-96 h-52 bg-primary-ultralight fixed top-[100px] left-[60px] z-5 shadow-[0px_5px_7.5px_rgba(0,0,0,0.20)]'}`}>
        {!userRegistered && <RegistrationForm submitForm={submitRegistrationForm} errorMessage={error}/>}
      </span>
    </div>
    
  )
}

export default Wallet;