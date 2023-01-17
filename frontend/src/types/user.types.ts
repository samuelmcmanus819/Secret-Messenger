import { ReactNode } from "react"

export type UserListType = {
  users: UserType[]
}

export type UserType = {
  name: string,
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

export type SingleUserQueryResponseType = {
  user: UserType
}

export type RegisterFormProps = {
  submitForm: (username: string) => void
}