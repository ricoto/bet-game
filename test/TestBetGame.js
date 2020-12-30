const BetGame = artifacts.require("BetGame");
const truffleAssert = require("truffle-assertions");

contract("BetGame", async function(accounts) {

  var instance;

  beforeEach(async function() {
    instance = await BetGame.new({from: accounts[1], value: web3.utils.toWei("1", "ether")});
  });

  afterEach(async function() {
    instance.withdrawAll({from: accounts[1]});
  });

  it("Try to bet with more than .1 ether", async function() {
    await truffleAssert.fails(instance.makeBet(0, {from: accounts[1], value: web3.utils.toWei("0.2", "ether")}), truffleAssert.ErrorType.REVERT);
  });

  it("Try to bet with less than .1 ether", async function() {
    await truffleAssert.fails(instance.makeBet(0, {from: accounts[1], value: web3.utils.toWei("0.05", "ether")}), truffleAssert.ErrorType.REVERT);
  });

  it("Bet 10 times with .1 ether", async function() {
    var heads = false;
    for (var i = 0; i < 10; i++) {
      await truffleAssert.passes(instance.makeBet(heads ? 0 : 1, {from: accounts[1], value: web3.utils.toWei("0.1", "ether")}));
    }
  });

  it("WithdrawAll and try to bet", async function() {
    await truffleAssert.passes(instance.withdrawAll({from: accounts[1]}));
    let balance = await instance.getGameBalance();
    await assert(balance == 0, "Balance is not zero: " + balance);
    await truffleAssert.fails(instance.makeBet(0, {from: accounts[1], value: web3.utils.toWei("0.1", "ether")}), truffleAssert.ErrorType.REVERT);
  });

  it("WithdrawAll and send 1 ether to contract and try to bet", async function() {
    await truffleAssert.passes(instance.withdrawAll({from: accounts[1]}));
    await truffleAssert.passes(instance.send(web3.utils.toWei("1", "ether"), {from: accounts[1]}));
    await truffleAssert.passes(instance.makeBet(0, {from: accounts[1], value: web3.utils.toWei("0.1", "ether")}));
  });

  it("Try to destroy contract and try to bet", async function() {
    await truffleAssert.passes(instance.destroy({from: accounts[1]}));
  });

  it("Destroy contract not as owner", async function() {
    await truffleAssert.fails(instance.destroy({from: accounts[0]}), truffleAssert.ErrorType.REVERT);
  });

});
