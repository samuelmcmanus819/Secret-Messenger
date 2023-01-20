export type UserType = {
  name: string,
  address: string
}

export type UsersState = {
  users: UserType[],
  chosenUser: UserType
}

export type SingleUserQueryResponseType = {
  user: UserType
}

export type RegisterFormProps = {
  submitForm: (username: string) => void,
  errorMessage: string
}