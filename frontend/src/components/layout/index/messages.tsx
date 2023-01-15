import MessageList from "components/messages/message-list";
import { useChattingUser } from "contexts/chatting-user-context";
import { useWallet } from "contexts/wallet-context";
import { useEffect, useState } from "react";
import { MessageType } from "types/message.types";

const Messages = () => {
  const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { wallet } = useWallet();
  const { chattingUser } = useChattingUser();

  const loadMessages = async(): Promise<MessageType[]> => {
    return wallet.query.compute.queryContract({ 
      contract_address: contractAddress, 
      query: { get_messages: { self_address: wallet.address, user2: chattingUser.address } } 
    });
  }

  useEffect(() => {
    console.log(chattingUser.address);
    if(chattingUser.address != ''){
      loadMessages().then(loadedMessages => setMessages(loadedMessages));
      console.log(messages)
    }
  }, [chattingUser.address])

  return (
    <MessageList messages={JSON.stringify(messages)} />
  )
}

export default Messages;