#[cfg(test)]
mod tests {
use crate::execute::{execute, instantiate};
use crate::msg::{
  InstantiateMsg, 
  QueryMsg, 
  UsersResponse, 
  ExecuteMsg, MessageResponse
};
use crate::query::query;
use crate::state::{EnrichedMessage};

use cosmwasm_std::{
  testing::*, 
  Response, 
  Binary, 
  MessageInfo, 
  DepsMut, Deps, Addr
};
use cosmwasm_std::{from_binary, Coin, Uint128};

fn execute_instantiate(deps: DepsMut, info: MessageInfo) {
  let init_msg = InstantiateMsg { name: String::from("Messenger Contract") };

  // we can just call .unwrap() to assert this was a success
  let _res: Response = instantiate(deps, mock_env(), info, init_msg).unwrap();
}

fn execute_connect_user(deps: DepsMut, info: MessageInfo) {
  let add_user_msg: ExecuteMsg = ExecuteMsg::Connect {  };
  let _res: Response = execute(deps, mock_env(), info, add_user_msg).unwrap();
}

fn execute_send_message(deps: DepsMut, info: MessageInfo, recipient: Addr, message: String){
  let send_msg: ExecuteMsg = ExecuteMsg::SendMessage { recipient, message };
  let _res: Response = execute(deps, mock_env(), info, send_msg).unwrap();
}

fn query_all_users(deps: Deps) -> Vec<Addr> {
  let users_query: QueryMsg = QueryMsg::GetAllUsers {  };
  let res: Binary = query(deps, mock_env(), users_query).unwrap();
  let users: UsersResponse = from_binary(&res).unwrap();
  users.users
}

fn query_chattable_users(deps: Deps, info: MessageInfo) -> Vec<Addr> {
  let users_query: QueryMsg = QueryMsg::GetChattableUsers { self_address: info.sender.clone() };
  let res: Binary = query(deps, mock_env(), users_query).unwrap();
  let users: UsersResponse = from_binary(&res).unwrap();
  users.users
}

fn query_messages(deps: Deps, info: MessageInfo, user2: Addr) -> Vec<EnrichedMessage> {
  let messages_query: QueryMsg = QueryMsg::GetMessages { self_address: info.sender.clone(), user2 };
  let res: Binary = query(deps, mock_env(), messages_query).unwrap();
  let messages: MessageResponse = from_binary(&res).unwrap();
  messages.messages
}

#[test]
fn proper_initialization() {
  let mut deps = mock_dependencies();
  let info = mock_info(
    "creator",
    &[Coin {
      denom: "earth".to_string(),
      amount: Uint128::new(1000),
    }],
  );
  execute_instantiate(deps.as_mut(), info.clone());
}

#[test]
fn get_users_empty() {
  let mut deps = mock_dependencies_with_balance(&[Coin {
    denom: "token".to_string(),
    amount: Uint128::new(2),
  }]);
  let info = mock_info(
    "creator",
    &[Coin {
      denom: "token".to_string(),
      amount: Uint128::new(2),
    }],
  );
  execute_instantiate(deps.as_mut(), info);

  let users_query: QueryMsg = QueryMsg::GetAllUsers {  };
  let res: Binary = query(deps.as_ref(), mock_env(), users_query).unwrap();
  let users: UsersResponse = from_binary(&res).unwrap();
  assert_eq!(0, users.users.len());
}

#[test]
fn add_user() {
  let mut deps = mock_dependencies_with_balance(&[Coin {
    denom: "token".to_string(),
    amount: Uint128::new(2),
  }]);
  let info = mock_info(
    "creator",
    &[Coin {
      denom: "token".to_string(),
      amount: Uint128::new(2),
    }],
  );
  execute_instantiate(deps.as_mut(), info.clone());
  execute_connect_user(deps.as_mut(), info.clone());

  let users = query_all_users(deps.as_ref());
  assert_eq!(1, users.len());
}

#[test]
fn add_user_twice() {
  let mut deps = mock_dependencies_with_balance(&[Coin {
      denom: "token".to_string(),
      amount: Uint128::new(2),
  }]);
  let info = mock_info(
      "creator",
      &[Coin {
          denom: "token".to_string(),
          amount: Uint128::new(2),
      }],
  );
  execute_instantiate(deps.as_mut(), info.clone());
  execute_connect_user(deps.as_mut(), info.clone());
  execute_connect_user(deps.as_mut(), info.clone());

  let users: Vec<Addr> = query_all_users(deps.as_ref());
  assert_eq!(1, users.len());
}

#[test]
fn self_not_in_chattable_users() {
  let mut deps = mock_dependencies_with_balance(&[Coin {
    denom: "token".to_string(),
    amount: Uint128::new(2),
  }]);
  let info: MessageInfo = mock_info(
    "creator",
    &[Coin {
      denom: "token".to_string(),
      amount: Uint128::new(2),
    }],
  );
  execute_instantiate(deps.as_mut(), info.clone());
  execute_connect_user(deps.as_mut(), info.clone());

  let users = query_chattable_users(deps.as_ref(), info.clone());
  assert_eq!(0, users.len());
}

  #[test]
  fn message_send_works() {
    let mut deps = mock_dependencies_with_balance(&[Coin {
      denom: "token".to_string(),
      amount: Uint128::new(2),
    }]);
    let user1_info: MessageInfo = mock_info(
      "creator",
      &[Coin {
        denom: "token".to_string(),
        amount: Uint128::new(2),
      }],
    );
    execute_instantiate(deps.as_mut(), user1_info.clone());
    execute_connect_user(deps.as_mut(), user1_info.clone());

    let user2_info: MessageInfo = mock_info(
      "anyone",
      &[Coin {
        denom: "token".to_string(),
        amount: Uint128::new(2),
      }],
    );
    execute_connect_user(deps.as_mut(), user1_info.clone());

    execute_send_message(deps.as_mut(), user1_info.clone(), user2_info.clone().sender, String::from("Hi"));
    let messages: Vec<EnrichedMessage> = query_messages(deps.as_ref(), user2_info.clone(), user1_info.clone().sender);
    assert_eq!(1, messages.len());
    assert_eq!("Hi", messages[0].content);

    let messages: Vec<EnrichedMessage> = query_messages(deps.as_ref(), user1_info.clone(), user2_info.clone().sender);
    assert_eq!(1, messages.len());
    assert_eq!("Hi", messages[0].content);
  }
}
