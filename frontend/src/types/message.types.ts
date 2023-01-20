export type MessageType = {
  timestamp: string,
  content: string,
  sender: string
}

export type MessagesState = {
  messages: MessageType[]
}