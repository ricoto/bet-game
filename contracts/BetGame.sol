pragma solidity 0.7.5;

import "./Destroyable.sol";
import "./Payable.sol";
import "./ReentranceGuard.sol";

contract BetGame is Destroyable, Payable, ReentranceGuard {

  uint constant internal BET_PRICE = 100000000 gwei; // 1/10 of ether
  uint constant internal INITIAL_BALANCE = 1 ether;
  uint constant internal PRIZE = BET_PRICE * 2;

  enum COIN_STATE {HEAD, TAIL}
  event MakeBetEvent(bool win);
  event WithdrawAllEvent();

  constructor() public payable costs(INITIAL_BALANCE) {
  }

  function makeBet(COIN_STATE coinState) public payable costs(BET_PRICE) nonReentrant() hasEnoughBalance(BET_PRICE) {
    COIN_STATE randomState = randomState();
    bool win = false;
    if (randomState == coinState) {
      msg.sender.transfer(PRIZE);
      win = true;
    }
    emit MakeBetEvent(win);
  }

  function getGameBalance() public view returns (uint balance) {
    return address(this).balance;
  }

  function withdrawAll() public isOwner() {
    msg.sender.transfer(address(this).balance);
    emit WithdrawAllEvent();
  }

  function randomState() private view returns (COIN_STATE) {
    return block.timestamp % 2 == 0 ? COIN_STATE.HEAD : COIN_STATE.TAIL;
  }

  // in case someone wants to recharge game balance
  fallback() external payable {
  }

}
