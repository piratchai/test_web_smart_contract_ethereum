// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 < 0.9.0;

import './test_import1.sol';

contract Start {
  address public owner = msg.sender;
  string private username;
  Test1 private test1;
  constructor() {
      test1 = new Test1();
  }
  
  function getUsername() public view returns (string memory) {
      return username;
  }
  
  function setUsername(string memory _username) public {
      username = _username;
  }
  
  function getOwner() public view returns (address){
      return owner;
  }
  
  function getOwnerTest1() public view returns (address){
      return test1.getOwnerTest1();
  }
}
