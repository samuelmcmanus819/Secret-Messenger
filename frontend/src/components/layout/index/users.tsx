import UserList from "components/user-list/user-list";
import { useWallet } from "components/wallet/wallet-context";
import { useEffect, useState } from "react";
import { SecretNetworkClient } from "secretjs";

const Users = () => {
  interface UsersResult {
    users: string[]
  }
  const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
  const [chattableUsers, setChattableUsers] = useState<string[]>([]);
  const [searchUsers, setSearchUsers] = useState<string[]>([]);
  const { wallet } = useWallet();

  const getUsers = (wallet: SecretNetworkClient, contractAddress: string): Promise<UsersResult> => {
    return wallet.query.compute.queryContract({ contract_address: contractAddress, query: { get_chattable_users: { self_address: wallet.address } } })
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value != ''){
      setSearchUsers(chattableUsers.filter(user => user.includes(e.target.value)))
    } else{
      setSearchUsers(chattableUsers)
    }
  }

  useEffect(() => {
    if(wallet.address != ''){
      getUsers(wallet, contractAddress).then(data => { setChattableUsers(data.users); setSearchUsers(data.users); })
    }
  }, [wallet]);

  return(
    <>
      <input onChange={search} className='w-[130px] bg-primary-ultralight px-1 rounded-md mt-1 focus:outline-none text-dark-text' placeholder="Search..."/>
      <UserList users={searchUsers} />
    </>
    
  )
}

export default Users;