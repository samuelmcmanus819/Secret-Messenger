import User from "components/user-list/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { deselectUser, updateUsers } from "redux/usersSlice";
import { SecretNetworkClient } from "secretjs";
import { UserType } from "types/user.types";


const UserList = () => {
  const codeHash = process.env.NEXT_PUBLIC_CODE_HASH ?? '';
  const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
  const [searchUsers, setSearchUsers] = useState<UserType[]>([]);
  const wallet = useSelector((state: RootState) => state.wallet.signingClient);
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();

  const getUsers = (wallet: SecretNetworkClient, contractAddress: string): Promise<UserType[]> => {
    return wallet.query.compute.queryContract({ contract_address: contractAddress, code_hash: codeHash, query: { get_chattable_users: { self_address: wallet.address } } })
  }

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value != ''){
      setSearchUsers(users.filter(user => user.address.includes(e.target.value)))
    } else{
      setSearchUsers(users)
    }
  }

  useEffect(() => {
    if(wallet.address != ''){
      getUsers(wallet, contractAddress).then(data => { dispatch(updateUsers(JSON.parse(JSON.stringify(data)).users)); setSearchUsers(JSON.parse(JSON.stringify(data)).users); })
    } else{
      dispatch(updateUsers([]));
      setSearchUsers([]);
      dispatch(deselectUser());
    }
  }, [wallet]);

  return (
    <>
      <input onChange={search} className='w-[130px] bg-primary-ultralight px-1 rounded-md mt-1 focus:outline-none text-dark-text' placeholder="Search..."/>
      <ul className="mt-2">
        {searchUsers.map((user) => {
          return (
            <li key={user.address}>
              <User address={user.address} name={user.name}/>
            </li>
          )
        })}
      </ul>
    </>
    
  );
}

export default UserList;