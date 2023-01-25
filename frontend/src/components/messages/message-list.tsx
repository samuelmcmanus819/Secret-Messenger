import Message from "components/messages/message";
import { loadMessages } from "hooks/message-hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMessages } from "redux/messagesSlice";
import { RootState } from "redux/store";

const MessageList = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const wallet = useSelector((state: RootState) => state.wallet.signingClient);
  const chosenUser = useSelector((state: RootState) => state.users.chosenUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if(chosenUser.address != ''){
        loadMessages(wallet, chosenUser).then(loadedMessages => dispatch(updateMessages(JSON.parse(JSON.stringify(loadedMessages)).messages)));
      } else{
        dispatch(updateMessages([]));
      }
      return () => clearInterval(interval);
    }, 5000);
  }, [chosenUser.address])

  return (
    <div className="flex flex-col justify-end h-[290px] max-h-[290px] mt-2 mx-2 overflow-y-auto">
      <ul className="max-h-[290px]">
        {(messages && messages.length > 0) ? messages.map((message) => {
          return (
            <li>
              <Message content={message.content} timestamp={message.timestamp} sender={message.sender}/>
            </li>
          )
        }) : ''}
      </ul>
    </div>
  );
}

export default MessageList;