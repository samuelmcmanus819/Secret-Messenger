import { SecretNetworkClient } from "secretjs";
import { SingleUserQueryResponseType } from "types/user.types";

export const getUsername = async(wallet: SecretNetworkClient): Promise<string> => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
  const user: SingleUserQueryResponseType = await wallet.query.compute.queryContract({ 
    contract_address: contractAddress, 
    query: { get_single_user_by_address: { search_address: wallet.address } } 
  });
  if(user.user == null){
    return '';
  }
  return user.user.name;
}

export const registerUser = async(wallet: SecretNetworkClient, username: string) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
  const codeHash = process.env.NEXT_PUBLIC_CODE_HASH ?? '';
  const registered = await wallet.tx.compute.executeContract({
    sender: wallet.address,
    contract_address: contractAddress,
    code_hash: codeHash,
    msg: { register: { username: username } }
  }, { gasLimit: 100_000 });
  if (registered.rawLog.includes('Username already taken')) { return 'Username already taken' }
  else if (registered.rawLog.includes('User already registered')) { return 'Your wallet is already registered' }
  else{ return 'Success' }
}
