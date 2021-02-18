// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 < 0.9.0;

contract Test1 {
  string private test1;
  
  constructor() {}
  
  function getTest1() public view returns (string memory) {
      return test1;
  }
  
  function setUsername(string memory _test1) public {
      test1 = _test1;
  }
  
  function getOwnerTest1() public view returns (address){
      return msg.sender;
  }
}
