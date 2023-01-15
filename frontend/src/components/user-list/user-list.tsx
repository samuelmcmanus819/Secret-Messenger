import { UserListType } from "types/user.types";
import User from "components/user-list/user";


const UserList = ({ users }: UserListType) => {
  console.log(users)
  return (
    <ul className="mt-2">
        {users.map((user) => {
          return (
            <li>
              <User address={user}/>
            </li>
          )
        })}
      </ul>
  );
}

export default UserList;