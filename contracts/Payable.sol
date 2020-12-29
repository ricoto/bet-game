pragma solidity 0.7.5;

abstract contract Payable {

  modifier costs(uint cost) {
    require(msg.value == cost, string(abi.encodePacked("Fixed amount should be passed: ", cost, " wei")));
    _;
  }

  modifier hasEnoughBalance(uint minBalance) {
    require(address(this).balance >= minBalance, "Not enough balance to play");
    _;
  }

}
