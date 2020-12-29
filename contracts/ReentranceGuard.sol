pragma solidity 0.7.5;

abstract contract ReentranceGuard {

  bool private entered = false;

  modifier nonReentrant() {
    require(!entered, "Has already entered this method once");
    entered = true;
    _;
    entered = false;
  }

}
