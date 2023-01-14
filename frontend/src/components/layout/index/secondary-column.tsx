import Wallet from "components/wallet/wallet";
import { ChattingUserProvider } from "contexts/chatting-user-context";
import UserList from "./users";

const SecondaryColumn = () => {
  return (
    <div className='flex flex-col w-[150px] h-full bg-primary-light justify-center items-center'>
      <ChattingUserProvider>
        <UserList />
        <Wallet />
      </ChattingUserProvider>
    </div>
  )
}

export default SecondaryColumn;