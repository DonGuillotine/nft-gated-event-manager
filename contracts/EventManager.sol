// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./EventNFT.sol";

contract EventManager is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    struct Event {
        string name;
        uint256 date;
        uint256 capacity;
        uint256 registeredCount;
        mapping(address => bool) registeredAttendees;
    }

    EventNFT public nftContract;
    Counters.Counter private _eventIdCounter;
    mapping(uint256 => Event) public events;

    event EventCreated(uint256 indexed eventId, string name, uint256 date, uint256 capacity);
    event UserRegistered(uint256 indexed eventId, address indexed user);

    constructor(address initialOwner, address _nftContract) Ownable(initialOwner) {
        nftContract = EventNFT(_nftContract);
    }

    function createEvent(string memory name, uint256 date, uint256 capacity) external onlyOwner {
        uint256 eventId = _eventIdCounter.current();
        _eventIdCounter.increment();

        Event storage newEvent = events[eventId];
        newEvent.name = name;
        newEvent.date = date;
        newEvent.capacity = capacity;
        newEvent.registeredCount = 0;

        emit EventCreated(eventId, name, date, capacity);
    }

    function registerForEvent(uint256 eventId) external nonReentrant {
        require(nftContract.balanceOf(msg.sender) > 0, "Must own an NFT to register");
        require(eventId < _eventIdCounter.current(), "Event does not exist");
        require(events[eventId].registeredCount < events[eventId].capacity, "Event is full");
        require(!events[eventId].registeredAttendees[msg.sender], "Already registered");

        events[eventId].registeredAttendees[msg.sender] = true;
        events[eventId].registeredCount++;

        emit UserRegistered(eventId, msg.sender);
    }

    function getEventDetails(uint256 eventId) external view returns (string memory name, uint256 date, uint256 capacity, uint256 registeredCount) {
        require(eventId < _eventIdCounter.current(), "Event does not exist");
        Event storage e = events[eventId];
        return (e.name, e.date, e.capacity, e.registeredCount);
    }

    function isRegistered(uint256 eventId, address user) external view returns (bool) {
        require(eventId < _eventIdCounter.current(), "Event does not exist");
        return events[eventId].registeredAttendees[user];
    }
}