
Creating a private network with GETH

Used geth and bootnode

We create 4 accounts:

geth --datadir node01 account new --password ./pwd.txt
geth --datadir node02 account new --password ./pwd.txt
geth --datadir node03 account new --password ./pwd.txt
geth --datadir node04 account new --password ./pwd.txt

Manually ceate genesis.json:

{
  "config": {
    "chainId": 777555, 
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "clique": {
      "period": 5, 
      "epoch": 30000 
    }
  },
  "alloc": {
    "Node01": {"balance": "1000000000000000000000000000000000000000000000000000000000"},
    "MetamaskWallet": {"balance" :"1000000000000000000000000000000000000000000000000000000000"}

  },
  "coinbase": "0x0000000000000000000000000000000000000000",
  "difficulty": "0x20000",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000000F6DAFf75841a236751a59285e07fABcA635aCf98Db1099FACe6B2327f3Cc150E8D74688d04DF25F3C3dE6eCF093B41a2F3514Bf8110F6e1AcDCfb031f341E2F87bb8F2C270C1CdC7b67bb014F7802590000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x47E7C4",
  "nonce": "0x0",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}

We ling each node to the genesis

geth init --datadir node01 genesis.json
geth init --datadir node02 genesis.json
geth init --datadir node03 genesis.json
geth init --datadir node04 genesis.json

Generate boot.key

bootnode -genkey boot.key

Get the enode details

bootnode -nodekey boot.key -addr :30001

enode://f7bcd37d5659042abee816a441c5214f09db1213352c681acbff592e7e9507a4b04916c81ae00f387397d896137f59a7d787329f8f2578a4db1d9d346ef76e71@127.0.0.1:0?discport=30001

Now, we start each node:

geth --authrpc.port 9651 --ipcpath "\.\pipe\nodo1" --datadir node01 --syncmode full --http --http.addr "0.0.0.0" --http.api "admin,eth,miner,net,txpool,personal,web3" --mine --miner.etherbase 0x0F6DAFf75841a236751a59285e07fABcA635aCf9 --http.port 9000 --allow-insecure-unlock --unlock 0x0F6DAFf75841a236751a59285e07fABcA635aCf9 --password pwd.txt --port 30050 --bootnodes "enode://f7bcd37d5659042abee816a441c5214f09db1213352c681acbff592e7e9507a4b04916c81ae00f387397d896137f59a7d787329f8f2578a4db1d9d346ef76e71@127.0.0.1:0?discport=30001"
geth --graphql --authrpc.port 9652 --ipcpath "\.\pipe\nodo2" --datadir node02 --syncmode full --http --http.addr "0.0.0.0" --http.api "admin,eth,miner,net,txpool,personal,web3" --mine --miner.etherbase 0x8Db1099FACe6B2327f3Cc150E8D74688d04DF25F --http.port 9001 --allow-insecure-unlock --unlock 0x8Db1099FACe6B2327f3Cc150E8D74688d04DF25F --password pwd.txt --port 30051 --bootnodes "enode://f7bcd37d5659042abee816a441c5214f09db1213352c681acbff592e7e9507a4b04916c81ae00f387397d896137f59a7d787329f8f2578a4db1d9d346ef76e71@127.0.0.1:0?discport=30001"
geth --authrpc.port 9653 --ipcpath "\.\pipe\nodo3" --datadir node03 --syncmode full --http --http.addr "0.0.0.0" --http.api "admin,eth,miner,net,txpool,personal,web3" --mine --miner.etherbase 0x3C3dE6eCF093B41a2F3514Bf8110F6e1AcDCfb03 --http.port 9002 --allow-insecure-unlock --unlock 0x3C3dE6eCF093B41a2F3514Bf8110F6e1AcDCfb03 --password pwd.txt --port 30052 --bootnodes "enode://f7bcd37d5659042abee816a441c5214f09db1213352c681acbff592e7e9507a4b04916c81ae00f387397d896137f59a7d787329f8f2578a4db1d9d346ef76e71@127.0.0.1:0?discport=30001"
geth --authrpc.port 9654 --ipcpath "\.\pipe\nodo4" --datadir node04 --syncmode full --http --http.addr "0.0.0.0" --http.api "admin,eth,miner,net,txpool,personal,web3" --mine --miner.etherbase 0x1f341E2F87bb8F2C270C1CdC7b67bb014F780259 --http.port 9003 --allow-insecure-unlock --unlock 0x1f341E2F87bb8F2C270C1CdC7b67bb014F780259 --password pwd.txt --port 30053 --bootnodes "enode://f7bcd37d5659042abee816a441c5214f09db1213352c681acbff592e7e9507a4b04916c81ae00f387397d896137f59a7d787329f8f2578a4db1d9d346ef76e71@127.0.0.1:0?discport=30001"



bootnode --nodekey=boot.key --verbosity=3 enode://f7bcd37d5659042abee816a441c5214f09db1213352c681acbff592e7e9507a4b04916c81ae00f387397d896137f59a7d787329f8f2578a4db1d9d346ef76e71@127.0.0.1:0?discport=30001 --discport=30001