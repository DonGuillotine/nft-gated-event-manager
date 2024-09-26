const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EventManager", function () {
  let EventNFT, eventNFT, EventManager, eventManager, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    EventNFT = await ethers.getContractFactory("EventNFT");
    eventNFT = await EventNFT.deploy(owner.address);

    EventManager = await ethers.getContractFactory("EventManager");
    eventManager = await EventManager.deploy(owner.address, await eventNFT.getAddress());
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await eventManager.owner()).to.equal(owner.address);
    });

    it("Should set the correct NFT contract address", async function () {
      expect(await eventManager.nftContract()).to.equal(await eventNFT.getAddress());
    });
  });

  describe("Event Creation", function () {
    it("Should allow the owner to create an event", async function () {
      await expect(eventManager.createEvent("Test Event", 1234567890, 100))
        .to.emit(eventManager, "EventCreated")
        .withArgs(0, "Test Event", 1234567890, 100);
    });

    it("Should not allow non-owners to create an event", async function () {
      await expect(eventManager.connect(addr1).createEvent("Test Event", 1234567890, 100))
        .to.be.revertedWithCustomError(eventManager, "OwnableUnauthorizedAccount");
    });
  });

  describe("Event Registration", function () {
    beforeEach(async function () {
      await eventManager.createEvent("Test Event", 1234567890, 100);
      await eventNFT.safeMint(addr1.address, "ipfs://QmTest");
    });

    it("Should allow NFT holders to register for an event", async function () {
      await expect(eventManager.connect(addr1).registerForEvent(0))
        .to.emit(eventManager, "UserRegistered")
        .withArgs(0, addr1.address);
    });

    it("Should not allow non-NFT holders to register for an event", async function () {
      await expect(eventManager.connect(addr2).registerForEvent(0))
        .to.be.revertedWith("Must own an NFT to register");
    });

    it("Should not allow double registration", async function () {
      await eventManager.connect(addr1).registerForEvent(0);
      await expect(eventManager.connect(addr1).registerForEvent(0))
        .to.be.revertedWith("Already registered");
    });

    it("Should not allow registration for non-existent events", async function () {
      await expect(eventManager.connect(addr1).registerForEvent(1))
        .to.be.revertedWith("Event does not exist");
    });
  });

  describe("Event Queries", function () {
    beforeEach(async function () {
      await eventManager.createEvent("Test Event", 1234567890, 100);
      await eventNFT.safeMint(addr1.address, "ipfs://QmTest");
      await eventManager.connect(addr1).registerForEvent(0);
    });

    it("Should return correct event details", async function () {
      const eventDetails = await eventManager.getEventDetails(0);
      expect(eventDetails[0]).to.equal("Test Event");
      expect(eventDetails[1]).to.equal(1234567890);
      expect(eventDetails[2]).to.equal(100);
      expect(eventDetails[3]).to.equal(1);
    });

    it("Should correctly report registration status", async function () {
      expect(await eventManager.isRegistered(0, addr1.address)).to.be.true;
      expect(await eventManager.isRegistered(0, addr2.address)).to.be.false;
    });
  });
});