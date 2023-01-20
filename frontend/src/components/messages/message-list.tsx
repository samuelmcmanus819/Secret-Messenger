import Message from "components/messages/message";
import { loadMessages } from "hooks/message-hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMessages } from "redux/messagesSlice";
import { RootState } from "redux/store";
import { MessageType } from "types/message.types";

const MessageList = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const wallet = useSelector((state: RootState) => state.wallet.signingClient);
  const chosenUser = useSelector((state: RootState) => state.users.chosenUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if(chosenUser.address != ''){
      loadMessages(wallet, chosenUser).then(loadedMessages => dispatch(updateMessages(JSON.parse(JSON.stringify(loadedMessages)).messages)));
    } else{
      dispatch(updateMessages([]));
    }
  }, [chosenUser.address])

  return (
    <ul className="flex flex-col justify-end h-[290px] mt-2">
        {(messages && messages.length > 0) ? messages.map((message) => {
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