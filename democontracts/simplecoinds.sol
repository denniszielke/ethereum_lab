pragma solidity ^0.4.0;

contract Coin {
    // remembers the coin minter
    address minter;
    // stores a mapping for balances of adress
    mapping (address => uint) balances;

    // constructor
    function Coin() {
        minter = msg.sender;
    }

    // give balance to a new owner
    function mint(address owner, uint amount) onlyMinter {
        balances[owner] += amount;
    }

    // transfer amount from sender to receiver
    function send(address receiver, uint amount) {
        if (balances[msg.sender] < amount) 
            return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }

    // query for balance of an address
    function queryBalance(address addr) constant returns (uint balance) {
        return balances[addr];
    }

    // function modifier execution only by the minter
    modifier onlyMinter {
        require(msg.sender == minter);
        _;
    }

    function kill() onlyMinter { 
        selfdestruct(minter);  // kills this contract and sends remaining funds back to creator
    } 
}