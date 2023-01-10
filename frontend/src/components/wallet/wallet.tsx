import { useWallet } from "@cosmos-kit/react";
import { MouseEventHandler } from "react";
import { Connected, Connecting, Disconnected, Rejected, Error, NotExist, WalletConnectComponent } from "./wallet-connect";

const Wallet = () => {
  const walletManager = useWallet(); 
  const {
    connect,
    openView,
    walletStatus,
  } = walletManager;

  const onClickConnect: MouseEventHandler = async (e) => {
    e.preventDefault();
    await connect();
  };

  const onClickOpenView: MouseEventHandler = (e) => {
    e.preventDefault();
    openView();
  };

  const ConnectWalletButton = (
      <WalletConnectComponent
        walletStatus={walletStatus}
        disconnect={
          <Disconnected onClick={onClickConnect} />
        }
        connecting={<Connecting />}
        connected={
          <Connected onClick={onClickOpenView} />
        }
        rejected={<Rejected onClick={onClickConnect} />}
        error={<Error onClick={onClickConnect} />}
        notExist={
          <NotExist onClick={onClickConnect} />
        }
      />
  );
  return (
    <div className="flex flex-col w-full items-center">
      {ConnectWalletButton}
    </div>
  )
}

export default Wallet;