import { UserType } from "types/user.types";

const User = ({ user }: UserType) => {
  return(
    <button className="w-[130px] h-[30px] overflow-hidden text-dark-text">
      {user}
    </button>
  )
}

export default User;