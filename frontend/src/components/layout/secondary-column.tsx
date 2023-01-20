import Wallet from "components/wallet/wallet";
import UserList from "components/user-list/user-list";

const SecondaryColumn = () => {
  return (
    <div className='flex flex-col w-[150px] h-full bg-primary-light justify-center items-center'>
        <UserList />
        <Wallet />
    </div>
  )
}

export default SecondaryColumn;