use cosmwasm_std::{entry_point, Deps, Env, StdResult, Binary, to_binary, Addr};

use crate::{msg::{QueryMsg, UsersResponse, MessageResponse}, state::{UsersStore, MessagesStore, Message, EnrichedMessage, User}};

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetAllUsers {} => to_binary(&get_all_users(deps)?),
        QueryMsg::GetChattableUsers { self_address } => to_binary(&get_chattable_users(deps, self_address)?),
        QueryMsg::GetMessages { self_address, user2 } => to_binary(&get_messages(deps, self_address, user2)?)
    }
}

fn get_all_users(deps: Deps) -> StdResult<UsersResponse> {
    let users: Option<Vec<User>> = UsersStore::load(deps.storage)?;
    match users{
        Some(users) => { return Ok(UsersResponse { users }) },
        None => { return Ok(UsersResponse { users: vec![] }) }
    }
}

fn get_chattable_users(deps: Deps, self_address: Addr) -> StdResult<UsersResponse> {
  let users: Option<Vec<User>> = UsersStore::load(deps.storage)?;
  let mut users: Vec<User> = match users {
    Some(users) =>  users, 
    None => vec![]
  };
  let index: Option<usize> = users.iter().position(|r| r.address == self_address);

  match index {
    Some(index) => { users.remove(index); },
    None => ()
  }
  Ok(UsersResponse { users })
}

fn get_messages(deps: Deps, self_address: Addr, user2: Addr) -> StdResult<MessageResponse> {
  let sent_messages: Option<Vec<Message>> = MessagesStore::load(deps.storage, &self_address, &user2)?;
  let sent_messages: Vec<Message> = match sent_messages {
    Some(messages) => messages,
    None => vec![]
  };

  let mut messages: Vec<EnrichedMessage> = vec![];
  for message in &sent_messages {
    messages.push(EnrichedMessage { timestamp: message.timestamp, content: String::from(&message.content), sender: String::from(self_address.as_str()) });
  }

  let received_messages: Option<Vec<Message>> = MessagesStore::load(deps.storage, &user2, &self_address)?;
  let received_messages: Vec<Message> = match received_messages {
    Some(messages) => messages,
    None => vec![]
  };
  for message in &received_messages {
    messages.push(EnrichedMessage { timestamp: message.timestamp, content: String::from(&message.content), sender: String::from(user2.as_str()) });
  }

  Ok(MessageResponse { messages: messages })
}