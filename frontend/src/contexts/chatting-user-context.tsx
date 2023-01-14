import { createContext, useContext, useState } from "react";
import { UserContextProviderPropsType, UserContextType, UserType } from "types/user.types";

const chattingUserDefaultValues: UserContextType = {
  chattingUser: { address: '' },
  selectUser: (user: UserType) => { },
  deselectUser: () => { }
}
const ChattingUserContext = createContext<UserContextType>(chattingUserDefaultValues);

export const useChattingUser = () => {
  return useContext(ChattingUserContext);
}
export const ChattingUserProvider = ({ children }: UserContextProviderPropsType) => {
  const [chattingUser, setChattingUser] = useState<UserType>({ address: '' });
  const selectUser = (user: UserType) => {
    setChattingUser(user);
  }
  const deselectUser = () => {
    setChattingUser({ address: '' });
  }
  const value = {
    chattingUser,
    selectUser,
    deselectUser
  }

  return (
    <ChattingUserContext.Provider value={value}>
      {children}
    </ChattingUserContext.Provider>
  )
}