pragma solidity ^0.4.0;

contract Purchase {
    uint public value;
    address public seller;
    address public buyer;
    enum State { Created, Locked, Inactive }
    State public state;

    function Purchase() public payable {
        seller = msg.sender;
        value = msg.value / 2;
        if (2 * value != msg.value) 
            revert();
    }

    modifier required(bool _condition) {
        if (!_condition) 
            revert();
        _;
    }

    modifier onlyBuyer() {
        if (msg.sender != buyer) 
            revert();
        _;
    }

    modifier onlySeller() {
        if (msg.sender != seller) 
            revert();
        _;
    }

    modifier inState(State _state) {
        if (state != _state) 
            revert();
        _;
    }

    event aborted();
    event purchaseConfirmed();
    event itemReceived();

    /// Abort the purchase and reclaim the ether.
    /// Can only be called by the seller before
    /// the contract is locked.
    function abort() public onlySeller inState(State.Created) {
        aborted();
        state = State.Inactive;
        if (!seller.send(this.balance))
            revert();
    }

    /// Confirm the purchase as buyer.
    /// Transaction has to include `2 * value` ether.
    /// The ether will be locked until confirmReceived
    /// is called.
    function confirmPurchase() public inState(State.Created) required(msg.value == 2 * value) payable {
        purchaseConfirmed();
        buyer = msg.sender;
        state = State.Locked;
    }

    /// Confirm that you (the buyer) received the item.
    /// This will release the locked ether.
    function confirmReceived() public onlyBuyer inState(State.Locked) {
        itemReceived();
        // It is important to change the state first because
        // otherwise, the contracts called using `send` below
        // can call in again here.
        state = State.Inactive;
        // This actually allows both the buyer and the seller to
        // block the refund.
        if (!buyer.send(value) || !seller.send(this.balance))
            revert();
    }
}