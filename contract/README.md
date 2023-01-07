# Secret Messenger Contract
The secret messenger contract is the backend for the Secret Messenger DApp

## Future Work
- Implement permissioned viewing (see SNIP-20 permissioned viewing in SCRT docs)
- Implement connection-orientation
- Implement groups

## CLI Usage
### Deployment on Local Secret
1. Change to this directory.
2. Start your local secret node and upload this directory. 
```
docker run -it --rm \
 -p 9091:9091 -p 26657:26657 -p 1317:1317 -p 5000:5000 \
 -v $(pwd):/root/code \
 --name localsecret ghcr.io/scrtlabs/localsecret
```
3. Pop a shell on your secret node `docker exec -it localsecret /bin/bash`
4. Change directories to the code directory `cd code`
5. Upload the contract to the local network  `secretd tx compute store contract.wasm.gz --from a --gas 1000000 -y --keyring-backend test`
6. Get the code ID of the contract `secretd query compute list-code`
7. Instantiate the contract `secretd tx compute instantiate $CODE_ID '{ "name": "secret messenger beta" }' --from a --label "my secret messenger" -y --keyring-backend test`
8. Get the address of the contract `secretd query compute list-contract-by-code 1`

### Add Users
1. Execute an add user command `secretd tx compute execute $CONTRACT_ADDRESS '{ "connect": { } }' --from a --keyring-backend test`

Note: You'll need to execute the above command from two different wallets to send messages back and forth.

2. Verify that your user exists `secretd query compute query $CONTRACT_ADDRESS '{ "get_all_users": {  } }'`

### Send a Message
Note: To perform this action you'll need to have two registered users.
1. Get a list of all chattable users (all users except for your current user) `secretd query compute query $CONTRACT_ADDRESS '{ "get_chattable_users": { "self_address": "$USER1_WALLET_ADDRESS" } }'`
2. Send a message to another user `secretd tx compute execute $CONTRACT_ADDRESS '{ "send_message": { "recipient": "$RECIPIENT_ADDRESS", "message": "Hi" } }' --from a --keyring-backend test`
3. Get a list of all messages between you and the other user `secretd query compute query $CONTRACT_ADDRESS '{ "get_messages": { "self_address": "$USER1_WALLET_ADDRESS", "user2": "$USER2_WALLET_ADDRESS" } }'`