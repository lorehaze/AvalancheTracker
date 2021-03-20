const { setConnection} = require('./providerController');

//Burned Avax Calculator
const feesCalculator = (_gasUsed) => {
    let gasPrice = 470; //gasPrice*10^(-9)
    let expConversion = 0.000000000001; //10^(-12) 
    let tempFees = (_gasUsed * gasPrice) * expConversion;   //convert to exp
    let fees = tempFees.toFixed(9); //get fixed value
    return fees;
}

const getBlock = async () => {
    web3 = await setConnection();   //set connection to avalanche c-chain endpoint
    let block = await web3.eth.getBlock("latest");    //get latest block info
    let hash = block.hash;  //get block hash
    let gasUsed = web3.utils.hexToNumber(block.gasUsed);    //get gas used
    let blockNumber = block.number; //get block number
    let burnedAvax = feesCalculator(gasUsed);   //calculate burned fees
    //Return as object
    return {
        hash,
        blockNumber,
        burnedAvax
    }

}



module.exports = {
    getBlock
}

