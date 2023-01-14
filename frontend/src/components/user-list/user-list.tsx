import User from "./user";

interface props {
  users: string[],
}

const UserList = ({ users }: props) => {
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