import { MessageType } from "types/message.types";

const Message = (message: MessageType) => {
  console.log(message.timestamp)
  console.log(new Date(1673760775233227831 / 1000000));
  console.log(new Date(0).setUTCMilliseconds(5000000000000));
  return(
    <div className='flex flex-col bg-primary-superultralight px-2 my-2 py-1 rounded-md'>
      <p>{message.content}</p>
      <p>{(new Date(Number(message.timestamp) / 1000000)).toLocaleTimeString()}</p>
    </div>
  )
}

export default Message;