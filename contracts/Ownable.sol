pragma solidity 0.7.5;

abstract contract Ownable {

  address payable internal immutable owner;

  modifier isOwner() {
    require(msg.sender == owner, "Owner only can execute this method");
    _;
  }

  constructor() {
    owner = msg.sender;
  }

}
