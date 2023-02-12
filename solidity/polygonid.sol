pragma solidity ^0.5.0;

contract Starter {

    // Variables
    string public name;

    // Constructor
    constructor() public {
        name = "My Starter Contract";
    }

    // Functions
    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    } 
}

