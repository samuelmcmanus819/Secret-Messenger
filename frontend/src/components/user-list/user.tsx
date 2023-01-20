import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { chooseUser } from "redux/usersSlice";
import { UserType } from "types/user.types";

const User = (user: UserType) => {
  const chattingUser = useSelector((state: RootState) => state.users.chosenUser);
  const dispatch = useDispatch();

  const userSelected = () => {
    dispatch(chooseUser(user))
  }

  return(
    <button onClick={userSelected} className={`w-[130px] h-[30px] overflow-hidden text-dark-text 
              ${user.address == chattingUser.address ? 'bg-primary-ultralight' : ''}`}>
      {user.name}
    </button>
  )
}

export default User;