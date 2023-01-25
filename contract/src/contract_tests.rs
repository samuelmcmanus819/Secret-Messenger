#[cfg(test)]
mod tests {
use crate::execute::{execute, instantiate};
use crate::msg::{
  InstantiateMsg, 
  QueryMsg, 
  UsersResponse, 
  ExecuteMsg, MessageResponse, SingleUserResponse
};
use crate::query::query;
use crate::state::{EnrichedMessage, User};

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

fn execute_register_user(deps: DepsMut, info: MessageInfo, username: String) {
  let add_user_msg: ExecuteMsg = ExecuteMsg::Register { username };
  let _res: Response = execute(deps, mock_env(), info, add_user_msg).unwrap();
}

fn execute_send_message(deps: DepsMut, info: MessageInfo, recipient: Addr, message: String){
  let send_msg: ExecuteMsg = ExecuteMsg::SendMessage { recipient, message };
  let _res: Response = execute(deps, mock_env(), info, send_msg).unwrap();
}

fn query_all_users(deps: Deps) -> Vec<User> {
  let users_query: QueryMsg = QueryMsg::GetAllUsers {  };
  let res: Binary = query(deps, mock_env(), users_query).unwrap();
  let users: UsersResponse = from_binary(&res).unwrap();
  users.users
}

fn query_chattable_users(deps: Deps, info: MessageInfo) -> Vec<User> {
  let users_query: QueryMsg = QueryMsg::GetChattableUsers { self_address: info.sender.clone() };
  let res: Binary = query(deps, mock_env(), users_query).unwrap();
  let users: UsersResponse = from_binary(&res).unwrap();
  users.users
}

fn query_single_user(deps: Deps, _info: MessageInfo, search_address: Addr) -> Option<User> {
  let user_query: QueryMsg = QueryMsg::GetSingleUserByAddress { search_address };
  let res: Binary = query(deps, mock_env(), user_query).unwrap();
  let user: SingleUserResponse = from_binary(&res).unwrap();
  user.user
}

fn query_messages(deps: Deps, info: MessageInfo, user2: Addr) -> Vec<EnrichedMessage> {
  let messages_query: QueryMsg = QueryMsg::GetMessages { self_address: info.sender.clone(), user2 };
  let res: Binary = query(deps, mock_env(), messages_query).unwrap();
  let messages: MessageResponse = from_binary(&res).unwrap();
  messages.messages
}

#[test]
fn proper_initialization() {
  //Set up dependencies and single user's wallet
  let mut deps = mock_dependencies();
  let info = mock_info(
    "creator",
    &[Coin {
      denom: "earth".to_string(),
      amount: Uint128::new(1000),
    }],
  );
  //Instantiate the contract
  execute_instantiate(deps.as_mut(), info.clone());
}

#[test]
fn get_users_empty() {
  //Set up dependencies and single user's wallet
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
  //Instantiate the contract
  execute_instantiate(deps.as_mut(), info);

  //Get a list of users and verify that it's empty
  let users_query: QueryMsg = QueryMsg::GetAllUsers {  };
  let res: Binary = query(deps.as_ref(), mock_env(), users_query).unwrap();
  let users: UsersResponse = from_binary(&res).unwrap();
  assert_eq!(0, users.users.len());
}

#[test]
fn add_user() {
  //Set up dependencies and single user's wallet
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
  //Instantiate the contract and register the user
  execute_instantiate(deps.as_mut(), info.clone());
  execute_register_user(deps.as_mut(), info.clone(), String::from("user1"));

  //Verify that the user was properly registered
  let users = query_all_users(deps.as_ref());
  assert_eq!(1, users.len());
}

#[test]
fn single_user_two_names() {
  //Set up dependencies and single user's wallet
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
  //Instantiate the contract
  execute_instantiate(deps.as_mut(), info.clone());

  //Successfully register the user
  execute_register_user(deps.as_mut(), info.clone(), String::from("user1"));
  //Unsuccessfully register the user with a different username
  let add_user_msg: ExecuteMsg = ExecuteMsg::Register { username: String::from("user2") };
  execute(deps.as_mut(), mock_env(), info, add_user_msg).unwrap_err();
}

#[test]
fn two_users_one_name() {
  //Set up dependencies and the first user's wallet
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
  //Instantiate the contract and register the first user
  execute_instantiate(deps.as_mut(), info.clone());
  execute_register_user(deps.as_mut(), info.clone(), String::from("user1"));

  //Attempt to register a second user's wallet with the same username as user 1
  let user2_info: MessageInfo = mock_info(
    "anyone",
    &[Coin {
      denom: "token".to_string(),
      amount: Uint128::new(2),
    }],
  );
  let add_user_msg: ExecuteMsg = ExecuteMsg::Register { username: String::from("user1") };
  execute(deps.as_mut(), mock_env(), user2_info, add_user_msg).unwrap_err();
}

#[test]
fn self_not_in_chattable_users() {
  //Set up dependencies and single user's wallet
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
  //Instantiate the contract and register the user
  execute_instantiate(deps.as_mut(), info.clone());
  execute_register_user(deps.as_mut(), info.clone(), String::from("user1"));

  //Verify that the user doesn't show up in the list of users that they can chat with
  let users = query_chattable_users(deps.as_ref(), info.clone());
  assert_eq!(0, users.len());
}

#[test]
fn get_single_user_works_successfully() {
  //Set up dependencies and single user's wallet
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
  //Instantiate the contract and register the user
  execute_instantiate(deps.as_mut(), info.clone());
  execute_register_user(deps.as_mut(), info.clone(), String::from("user1"));

  //Verify that the user exists in a single user query
  let user = query_single_user(deps.as_ref(), info.clone(), info.sender.clone());
  assert!(user.is_some());
}

#[test]
fn get_nonexistent_user_returns_none() {
  //Set up dependencies and single user's wallet
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
  //Instantiate the contract and register the user
  execute_instantiate(deps.as_mut(), info.clone());
  execute_register_user(deps.as_mut(), info.clone(), String::from("user1"));

  //Verify that the user doesn't show up in the list of users that they can chat with
  let user = query_single_user(deps.as_ref(), info.clone(), Addr::unchecked("rando"));
  assert!(user.is_none());
}

  #[test]
  fn message_send_works() {
    //Set up dependencies and first user's wallet
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
    //Instantiate the contract and register the first user
    execute_instantiate(deps.as_mut(), user1_info.clone());
    execute_register_user(deps.as_mut(), user1_info.clone(), String::from("user1"));

    //Set up the second user's wallet and register them
    let user2_info: MessageInfo = mock_info(
      "anyone",
      &[Coin {
        denom: "token".to_string(),
        amount: Uint128::new(2),
      }],
    );
    execute_register_user(deps.as_mut(), user2_info.clone(), String::from("user2"));

    //Send a message and verify that you can see it regardless of who's called the sender vs recipient
    execute_send_message(deps.as_mut(), user1_info.clone(), user2_info.clone().sender, String::from("Hi"));
    let messages: Vec<EnrichedMessage> = query_messages(deps.as_ref(), user2_info.clone(), user1_info.clone().sender);
    assert_eq!(1, messages.len());
    assert_eq!("Hi", messages[0].content);

    let messages: Vec<EnrichedMessage> = query_messages(deps.as_ref(), user1_info.clone(), user2_info.clone().sender);
    assert_eq!(1, messages.len());
    assert_eq!("Hi", messages[0].content);
  }

  #[test]
  fn message_to_nonexistent_user_fails() {
    //Set up dependencies and first user's wallet
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
    //Instantiate the contract and register the first user
    execute_instantiate(deps.as_mut(), user1_info.clone());
    execute_register_user(deps.as_mut(), user1_info.clone(), String::from("user1"));

    //Set up the second user's wallet but don't register them
    let user2_info: MessageInfo = mock_info(
      "anyone",
      &[Coin {
        denom: "token".to_string(),
        amount: Uint128::new(2),
      }],
    );

    //Send a message to the unregistered user and verify that it fails
    let send_msg: ExecuteMsg = ExecuteMsg::SendMessage { recipient: user2_info.sender.clone(), message: String::from("Hi") };
    execute(deps.as_mut(), mock_env(), user1_info, send_msg).unwrap_err();
  }
}
