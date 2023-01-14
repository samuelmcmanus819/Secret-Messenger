import { SecretNetworkClient } from "secretjs";

const chainID = process.env.NEXT_PUBLIC_CHAIN_ID;
const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;
const lcdEndpoint = process.env.NEXT_PUBLIC_LCD_ENDPOINT;

export const connectLeapWallet = async() => {
  if ((!window.leap || !window.leap.getEnigmaUtils || !window.leap.getOfflineSignerOnlyAmino)){
    alert("Please install the Leap extension")
    return null;
  } 

  await window.leap.enable(chainID);
  const offlineSigner = window.leap.getOfflineSignerOnlyAmino(chainID);
  const [{ address }] = await offlineSigner.getAccounts();
  const secretSigningClient = new SecretNetworkClient({
    url: lcdEndpoint,
    chainId: chainID,
    wallet: offlineSigner,
    walletAddress: address,
    encryptionUtils: window.leap.getEnigmaUtils(chainID)
  });

  return secretSigningClient;
}

  
export const connectKeplrWallet = async() => {
  if ((!window.keplr || !window.getEnigmaUtils || !window.getOfflineSignerOnlyAmino)) {
    alert("Please install the Keplr extension")
    return null;
  }

  await window.keplr.enable(chainID);
  const offlineSigner = window.keplr.getOfflineSignerOnlyAmino(chainID);
  const [{ address }] = await offlineSigner.getAccounts();
  const secretSigningClient = new SecretNetworkClient({
    url: lcdEndpoint,
    chainId: chainID,
    wallet: offlineSigner,
    walletAddress: address,
    encryptionUtils: window.keplr.getEnigmaUtils(chainID)
  });

  return secretSigningClient;
}
