import { useChattingUser } from "contexts/chatting-user-context";
import { UserType } from "types/user.types";

const User = (user: UserType) => {
  const { chattingUser, selectUser, deselectUser } = useChattingUser();

  const userSelected = () => {
    selectUser(user);
  }

  return(
    <button onClick={userSelected} className={`w-[130px] h-[30px] overflow-hidden text-dark-text 
              ${user.address == chattingUser.address ? 'bg-primary-ultralight' : ''}`}>
      {user.address}
    </button>
  )
}

export default User;