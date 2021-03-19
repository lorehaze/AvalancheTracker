var Web3 = require('web3');

const setConnection = async () => {
    let _web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc')); //set provider
    return _web3;
}

module.exports = {
    setConnection
}