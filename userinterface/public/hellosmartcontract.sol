pragma solidity ^0.4.0;

contract HelloSmartContract {
    // remembers value
    string word;
    // remembers owner
    address owner;
    
    // constructor
    function HelloSmartContract(string _word) {
        word = _word;
        owner = msg.sender;
    }
    
    // event for notificatin of value change
    event Changed(address a);
    
    // function modifier execution only by the owner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    // read value function - can be called without transaction
    function getWord() constant returns(string) {
        return word; // return value
    }
    
    // set value function - called by transaction
    function setWord(string w) onlyOwner {
        word = w; // set value
        Changed(msg.sender); // trigger changed event
    }

    function kill() onlyOwner { 
        selfdestruct(owner);  // kills this contract and sends remaining funds back to creator
    }    
}