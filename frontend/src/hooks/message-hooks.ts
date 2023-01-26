import { SecretNetworkClient } from "secretjs";
import { MessagesState, MessageType } from "types/message.types";
import { UserType } from "types/user.types";

export const loadMessages = async(wallet: SecretNetworkClient, chosenUser: UserType): Promise<MessageType[]> => {
  const { messages } = (await wallet.query.compute.queryContract({ 
    contract_address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '', 
    code_hash: process.env.NEXT_PUBLIC_CODE_HASH ?? '',
    query: { get_messages: { self_address: wallet.address, user2: chosenUser.address } } 
  })) as MessagesState;
  return messages;
}