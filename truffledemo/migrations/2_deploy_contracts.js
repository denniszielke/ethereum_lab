var HelloSmartContract = artifacts.require("./HelloSmartContract.sol");

module.exports = function(deployer) {
  deployer.deploy(HelloSmartContract, 'HelloDennis');
};
