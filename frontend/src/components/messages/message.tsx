import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { MessageType } from "types/message.types";

const Message = (message: MessageType) => {
  const wallet = useSelector((state: RootState) => state.wallet.signingClient);
  return(
    <div className={`flex w-full ${message.sender == wallet.address ? "justify-start" : "justify-end"}`}>
      <div className='bg-primary-superultralight px-2 my-2 py-1 rounded-md max-w-[170px] overflow-auto'>
        <p className="text-sm">{message.content}</p>
        <p className="text-end text-xs">{(new Date(Number(message.timestamp) / 1000000)).toLocaleTimeString()}</p>
      </div>
    </div>
  )
}

export default Message;