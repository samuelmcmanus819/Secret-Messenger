use schemars::JsonSchema;
use secret_toolkit::{
  storage::{
    Item 
  }
};
use serde::{Deserialize, Serialize};

use cosmwasm_std::{
  Storage, 
  Addr, 
  StdResult, 
  Timestamp, StdError 
};
use cosmwasm_storage::{
  singleton, 
  singleton_read, 
  ReadonlySingleton, 
  Singleton
};

pub const CONFIG_KEY: &[u8] = b"config";
pub const USERS_KEY: &[u8] = b"users";
pub const CONNECTION_KEY: &[u8] = b"connections";
pub const MESSAGES_KEY: &[u8] = b"messages";

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct Config {
  pub name: String,
}
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct User {
  pub name: String,
  pub address: Addr
}
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct Message {
  pub timestamp: Timestamp,
  pub content: String
}
#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct EnrichedMessage {
  pub timestamp: Timestamp,
  pub content: String,
  pub sender: String
}

pub static CONFIG: Item<Config> = Item::new(CONFIG_KEY);
pub static USERS: Item<Vec<User>> = Item::new(USERS_KEY);

pub struct UsersStore {}
impl UsersStore {
  pub fn load(store: &dyn Storage) -> StdResult<Option<Vec<User>>> {
    USERS.may_load(store)
  }

  pub fn save(store: &mut dyn Storage, users_to_add: Vec<User>) -> StdResult<()> {
    USERS.save(store, &users_to_add)
  }

  pub fn register_user(store: &mut dyn Storage, user_to_add: User) -> StdResult<()> {
    //Grab the current state of the users list
    let loaded_users: Option<Vec<User>> = USERS.may_load(store)?;
    let mut loaded_users: Vec<User> = match loaded_users{
      Some(user) => { user },
      None => { vec![] }
    };

    //Check if the user's address is already registered
    for user in loaded_users.clone(){
      if user.address == user_to_add.address {
        return Result::Err(StdError::GenericErr { msg: String::from("User already registered") })
      }
      if user.name == user_to_add.name {
        return Result::Err(StdError::GenericErr { msg: String::from("Username already taken") })
      }
    }
    loaded_users.extend(vec![user_to_add]);

    //Update the users list
    USERS.save(store, &loaded_users)
  }
}

pub static MESSAGES: Item<Vec<Message>> = Item::new(MESSAGES_KEY);
pub struct MessagesStore {}
impl MessagesStore {
  pub fn load<'a>(store: &'a dyn Storage, user1: &Addr, user2: &Addr) -> StdResult<Option<Vec<Message>>>  {
    let messages: Item<Vec<Message>> = (MESSAGES.add_suffix(user1.as_str().as_bytes())).add_suffix(user2.as_str().as_bytes());
    messages.may_load(store)
  }

  pub fn add_message(store: &mut dyn Storage, user1: &Addr, user2: &Addr, msg: Message) -> StdResult<()> {
    //Load the existing messages between the two communicating users
    let messages: Item<Vec<Message>> = (MESSAGES.add_suffix(user1.as_str().as_bytes())).add_suffix(user2.as_str().as_bytes());
    let loaded_messages = messages
      .may_load(store)?;
    let mut loaded_messages: Vec<Message> = match loaded_messages{
      Some(messages) => { messages }
      None => { vec![] }
    };
    //Add the current messages to the list of messages between the users
    loaded_messages.extend(vec![msg]);

    //Save the state of their messages
    messages.save(store, &loaded_messages)
  }

  pub fn save(store: &mut dyn Storage, user1: &Addr, user2: &Addr, msgs: Vec<Message>) -> StdResult<()> {
    let messages = (MESSAGES.add_suffix(user1.as_str().as_bytes())).add_suffix(user2.as_str().as_bytes());
    messages.save(store, &msgs)
  }
}


pub fn config(storage: &mut dyn Storage) -> Singleton<Config> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read(storage: &dyn Storage) -> ReadonlySingleton<Config> {
    singleton_read(storage, CONFIG_KEY)
}
