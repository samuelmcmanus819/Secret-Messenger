use cosmwasm_std::{entry_point, Deps, Env, StdResult, Binary, to_binary, Addr};

use crate::{msg::{QueryMsg, UsersResponse, MessageResponse}, state::{UsersStore, MessagesStore, Message}};

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetAllUsers {} => to_binary(&get_all_users(deps)?),
        QueryMsg::GetChattableUsers { self_address } => to_binary(&get_chattable_users(deps, self_address)?),
        QueryMsg::GetMessages { self_address, user2 } => to_binary(&get_messages(deps, self_address, user2)?)
    }
}

fn get_all_users(deps: Deps) -> StdResult<UsersResponse> {
    let users: Option<Vec<Addr>> = UsersStore::load(deps.storage)?;
    match users{
        Some(users) => { return Ok(UsersResponse { users }) },
        None => { return Ok(UsersResponse { users: vec![] }) }
    }
}

fn get_chattable_users(deps: Deps, self_address: Addr) -> StdResult<UsersResponse> {
  let users: Option<Vec<Addr>> = UsersStore::load(deps.storage)?;
  let mut users: Vec<Addr> = match users {
    Some(users) =>  users, 
    None => vec![]
  };
  let index: Option<usize> = users.iter().position(|r| r == &self_address);

  match index {
    Some(index) => { users.remove(index); },
    None => ()
  }
  Ok(UsersResponse { users })
}

fn get_messages(deps: Deps, self_address: Addr, user2: Addr) -> StdResult<MessageResponse> {
  let messages: Option<Vec<Message>> = MessagesStore::load(deps.storage, &self_address, &user2)?;
  let messages: Vec<Message> = match messages {
    Some(messages) => messages,
    None => vec![]
  };

  Ok(MessageResponse { messages })
}