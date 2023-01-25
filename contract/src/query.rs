use cosmwasm_std::{ entry_point, Deps, Env, StdResult, Binary, to_binary, Addr };

use crate::{
  msg::{
    QueryMsg, UsersResponse, MessageResponse, SingleUserResponse
  }, 
  state::{
    UsersStore, MessagesStore, Message, EnrichedMessage, User
}};

//Route the user's query to the appropriate function
#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
  match msg {
    QueryMsg::GetAllUsers {} => to_binary(&get_all_users(deps)?),
    QueryMsg::GetChattableUsers { self_address } => to_binary(&get_chattable_users(deps, self_address)?),
    QueryMsg::GetSingleUserByAddress { search_address } => to_binary(&get_single_user_by_address(deps, search_address)?),
    QueryMsg::GetMessages { self_address, user2 } => to_binary(&get_messages(deps, self_address, user2)?)
  }
}

//Get a list of all users
fn get_all_users(deps: Deps) -> StdResult<UsersResponse> {
  //Get a list of all users
  let users: Option<Vec<User>> = UsersStore::load(deps.storage)?;
  //If there are no users then return an empty list
  match users{
    Some(users) => { return Ok(UsersResponse { users }) },
    None => { return Ok(UsersResponse { users: vec![] }) }
  }
}

//Get a list of all chattable users (everyone but the querier)
fn get_chattable_users(deps: Deps, self_address: Addr) -> StdResult<UsersResponse> {
  //Get a list of all users
  let users: Option<Vec<User>> = UsersStore::load(deps.storage)?;
  //If there are no users then return an empty list
  let mut users: Vec<User> = match users {
    Some(users) =>  users, 
    None => vec![]
  };

  //Remove the querier from the list of users
  let index: Option<usize> = users.iter().position(|r| r.address == self_address);
  match index {
    Some(index) => { users.remove(index); },
    None => ()
  }
  Ok(UsersResponse { users })
}

fn get_single_user_by_address(deps: Deps, search_address: Addr) -> StdResult<SingleUserResponse> {
  //Get a list of all users
  let users: Option<Vec<User>> = UsersStore::load(deps.storage)?;
  //If there are no users then return an empty list
  let users: Vec<User> = match users {
    Some(users) =>  users, 
    None => vec![]
  };

  //Grab the searched user by their wallet address and return it.
  for user in users{
    if user.address == search_address {
      return Ok(SingleUserResponse { user: Some(user) });
    }
  }

  //If the user does not exist, then return null.
  Ok(SingleUserResponse { user: None })
}

//Get a list of all messages between two users
fn get_messages(deps: Deps, self_address: Addr, user2: Addr) -> StdResult<MessageResponse> {
  //Load all of the messages between the users where the querier is the sender
  let sent_messages: Option<Vec<Message>> = MessagesStore::load(deps.storage, &self_address, &user2)?;
  //If there are no messages then return an empty list
  let sent_messages: Vec<Message> = match sent_messages {
    Some(messages) => messages,
    None => vec![]
  };

  //Enrich the messages by adding the user's address as the sender. This is helpful for formatting on the user's side.
  let mut messages: Vec<EnrichedMessage> = vec![];
  for message in &sent_messages {
    messages.push(EnrichedMessage { timestamp: message.timestamp, content: String::from(&message.content), sender: String::from(self_address.as_str()) });
  }

  //Load all of the messages between the users where the querier is the recipient
  let received_messages: Option<Vec<Message>> = MessagesStore::load(deps.storage, &user2, &self_address)?;
  //If there are no messages then return an empty list
  let received_messages: Vec<Message> = match received_messages {
    Some(messages) => messages,
    None => vec![]
  };

  //Enrich the messages by adding the non-querier's address as the sender. This is helpful for formatting on the user's side.
  for message in &received_messages {
    messages.push(EnrichedMessage { timestamp: message.timestamp, content: String::from(&message.content), sender: String::from(user2.as_str()) });
  }

  messages.sort_by(|a, b| a.timestamp.cmp(&b.timestamp));
  Ok(MessageResponse { messages: messages })
}