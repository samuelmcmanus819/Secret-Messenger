import { MouseEventHandler, ReactNode } from "react";
import { WalletStatus } from "@cosmos-kit/core";


interface ConnectButtonProps {
  buttonText?: string,
  onClick?: MouseEventHandler,
  isLoading?: boolean,
  isDisabled?: boolean
}

interface WalletConnectComponentProps {
  walletStatus: WalletStatus,
  disconnect: ReactNode;
  connecting: ReactNode;
  connected: ReactNode;
  rejected: ReactNode;
  error: ReactNode;
  notExist: ReactNode;
}

interface ConnectProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const WalletButton = ({ buttonText, onClick }: ConnectButtonProps) => {
  return (
    
      <button onClick={onClick} className="w-24 h-8 bg-primary-main font-semibold font-serif text-[10px] 
        rounded-lg flex flex-col justify-center items-center text-center text-white mb-3" >
      {buttonText ? buttonText : "Connect Wallet"}
      </button>
  )
}

export const Disconnected = ({ onClick }: ConnectProps) => {
  return (
    <WalletButton buttonText="Connect Wallet" onClick={onClick} />
  );
}

export const Connected = ({ onClick }: ConnectProps) => {
  return (
    <WalletButton buttonText="My Wallet" onClick={onClick} />
  );
};

export const Connecting = () => {
  return <WalletButton isLoading={true} />;
}

export const Rejected = ({ onClick }: ConnectProps) => {
  return (
    <WalletButton
      buttonText="Reconnect"
      isDisabled={false}
      onClick={onClick} />
  )
}

export const Error = ({ onClick }: ConnectProps) => {
  return (
    <WalletButton
      buttonText="Change Wallet"
      isDisabled={false}
      onClick={onClick} />
  )
}

export const NotExist = ({ onClick }: ConnectProps) => {
  return (
    <WalletButton
      buttonText='Install Wallet'
      isDisabled={false}
      onClick={onClick} />
  )
} 

export const WalletConnectComponent = ({ walletStatus, disconnect, connecting, connected, rejected, error, notExist }: WalletConnectComponentProps) => {
  switch (walletStatus) {
    case "Disconnected":
      return <>{disconnect}</>;
    case "Connecting":
      return <>{connecting}</>;
    case "Connected":
      return <>{connected}</>;
    case "Rejected":
      return <>{rejected}</>;
    case "Error":
      return <>{error}</>;
    case "NotExist":
      return <>{notExist}</>;
    default:
      return <>{disconnect}</>
  }
}