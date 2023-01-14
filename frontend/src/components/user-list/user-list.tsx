import { UserListType } from "types/user.types";
import User from "./user";


const UserList = ({ users }: UserListType) => {
  return (
    <ul className="mt-2">
        {users.map((user) => {
          return (
            <li>
              <User user={user}/>
            </li>
          )
        })}
      </ul>
  );
}

export default UserList;