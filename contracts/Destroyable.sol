pragma solidity 0.7.5;

import "./Ownable.sol";

abstract contract Destroyable is Ownable {

  function destroy() public isOwner {
    selfdestruct(msg.sender);
  }

}
