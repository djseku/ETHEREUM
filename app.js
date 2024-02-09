const {Web3} = require ("Web3")

const web3 = new Web3("http://localhost:9000")


async function getLastBlock() {
    const bloque = await web3.eth.getBlockNumber()
    console.log(bloque)
    return bloque
}
//getLastBlock(6)

var tx ={
    from: "0x70e7C31D195dC1F08283cb850b9C14d64282f09A",
    to:"0xc8E32d1DfE88E82d3e0a3603Fbe4DC1E831a6570",
    value: '100',
    gasPrice: 1,
    gasUsed: 21000,
    gasLimit: 21000
}

async function sendTransaction(){
    const consttx = await web3.eth.sendTransaction(tx, "123456")
    console.log(consttx)
}
   
//sendTransaction()