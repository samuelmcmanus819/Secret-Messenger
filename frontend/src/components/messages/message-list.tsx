import { MessageListType, MessageType } from "types/message.types";
import Message from "components/messages/message";

const MessageList = ({ messages }: MessageListType) => {
  return (
    <ul className="mt-2">
        {(JSON.parse(messages).messages && JSON.parse(messages).messages.length > 0) ? (JSON.parse(messages).messages as MessageType[]).map((message) => {
          return (
            <li>
              <Message content={message.content} timestamp={message.timestamp}/>
            </li>
          )
        }) : ''}
      </ul>
  );
}

export default MessageList;