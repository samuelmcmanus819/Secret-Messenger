import { SecretNetworkClient } from "secretjs";
import { MessageType } from "types/message.types";
import { UserType } from "types/user.types";

export const loadMessages = async(wallet: SecretNetworkClient, chosenUser: UserType): Promise<MessageType[]> => {
  return wallet.query.compute.queryContract({ 
    contract_address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '', 
    query: { get_messages: { self_address: wallet.address, user2: chosenUser.address } } 
  });
}