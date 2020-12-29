const BetGame = artifacts.require("BetGame");

// contract address 0xe6C9268f144e38DD61a187F2268248db7DD7903C 

module.exports = function (deployer, network, accounts) {
  deployer.deploy(BetGame, {from: accounts[1], value: web3.utils.toWei("1", "ether")});
  // deployer.deploy(SecretsManager, {value: web3.utils.toWei("1", "ether")}).then(function(instance) {
  //   instance.getMessage().then(function(message) {
  //     console.log("Message data received: " + message);
  //   });
  //   instance.createSecret("ricoto", "loves", "ricoto loves Japan", 1000000, {value: 10000000, from: accounts[0]}).catch(function(err) {
  //     console.log("Error while creating secret: " + err);
  //   });
  // });
};
