interface props {
  user: string
}

const User = ({ user }: props) => {
  return(
    <button className="w-[130px] h-[30px] overflow-hidden text-white">
      {user}
    </button>
  )
}

export default User;