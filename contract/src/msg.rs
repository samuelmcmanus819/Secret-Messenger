use cosmwasm_std::Addr;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::state::{EnrichedMessage, User};

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
  pub name: String,  
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
  Register { username: String },
  SendMessage { recipient: Addr, message: String }
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
  GetAllUsers {},
  GetChattableUsers { self_address: Addr },
  GetSingleUserByAddress { search_address: Addr },
  GetMessages { self_address: Addr, user2: Addr }
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct UsersResponse {
  pub users: Vec<User>,
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct SingleUserResponse {
  pub user: Option<User>
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
pub struct MessageResponse {
  pub messages: Vec<EnrichedMessage>
}
