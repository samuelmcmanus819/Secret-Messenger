import { ReactNode } from "react"

export type UserListType = {
  users: string[]
}

export type UserType = {
  address: string
}

export type UserContextType = {
  chattingUser: UserType,
  selectUser: (user: UserType) => void,
  deselectUser: () => void
}

export type UserContextProviderPropsType = {
  children: ReactNode;
}