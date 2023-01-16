use cosmwasm_std::{
  DepsMut, 
  Env, 
  MessageInfo, 
  StdResult, 
  Response, 
  entry_point, 
  Addr, StdError, 
};

use crate::{
  state::{
    UsersStore, 
    Config, 
    config, 
    MessagesStore, 
    Message, User
  }, 
  msg::{
    ExecuteMsg, 
    InstantiateMsg
  }
};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = Config {
        name: msg.name
    };

    deps.api
        .debug(format!("Contract was initialized by {}", info.sender).as_str());
    config(deps.storage).save(&state)?;

    Ok(Response::default())
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> StdResult<Response> {
  match msg {
    ExecuteMsg::Register { username } => try_register(deps, env, info, username),
    ExecuteMsg::SendMessage { recipient, message } => try_send_message(deps, env, info, recipient, message)
  }
}

fn try_register(deps: DepsMut, _env: Env, info: MessageInfo, username: String) -> StdResult<Response> {
  UsersStore::register_user(deps.storage, User{ name: username, address: info.sender.clone() })?;
  Ok(Response::default())
}

fn try_send_message(deps: DepsMut, env: Env, info: MessageInfo, recipient: Addr, message: String) -> StdResult<Response> {
  //Load the list of registered users
  let users = UsersStore::load(deps.storage)?;
  let users = match users{
    Some(users) => { users },
    None => { vec![] }
  };

  //Check if the sender and recipient both exist
  let mut users_exist: [bool; 2] = [false, false];
  for user in users {
    if user.address == info.sender.clone() {
      users_exist[0] = true;
    }
    if user.address == recipient {
      users_exist[1] = true;
    }
  }
  //Error out if the sender or recipient is unregistered
  if users_exist[0] == false || users_exist[1] == false {
    return Result::Err(StdError::GenericErr { msg: String::from("You can only send messages to a registered user") })
  }

  let full_message: Message = Message {
    content: message,
    timestamp: env.block.time
  };
  MessagesStore::add_message(deps.storage, &info.sender.clone(), &recipient, full_message)?;
  Ok(Response::default())
}