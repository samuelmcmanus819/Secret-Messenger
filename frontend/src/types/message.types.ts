export type MessageType = {
  timestamp: string,
  content: string
}

export type MessagesState = {
  messages: MessageType[]
}