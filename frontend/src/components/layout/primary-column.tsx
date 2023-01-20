import MessageList from "components/messages/message-list";
import Messenger from "components/messages/messenger";

const PrimaryColumn = () => {
  return (
    <div className='flex flex-col h-full w-[350px]'>
      <MessageList/>
      <Messenger />
    </div>
  )
}

export default PrimaryColumn;