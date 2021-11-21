// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Nft.sol";
import "./Helper.sol";
 
/*
 * @title Story Smart Contract
 * @notice Primary smart contract for running Storyline operations.
 */
contract Story {
  /*
   * StoryElement Struct.
   * A single piece of Storyline content, published by a writer.
   * @dev Any metadata about story content should go here.
   */
  struct StoryElement {
    uint256 id; 
    uint256 dateTime;
    string content;
    address author;
    NFT nft;
  }

  /*
   * StoryElement Master List.
   * List of StoryElement structs, in published order.
   * StoryLine should traverse this to build the latest story.
   * @dev Newly published StoryElements should go here.
   */
  StoryElement[] story;

  /*
   * Next available StoryElement id.
   * This should realistically never reach the maximum representation.
   */
  uint256 nextElementId;
  uint256 MINTING_PRICE = 50 wei;
  uint256 WRITING_FEE = 0 wei;
  Helper helper;

  /*
   * Story contract constructor.
   * @dev This should initialize the default story to "Once upon a time "
   */
  constructor() {
    helper = new Helper();
    nextElementId = 1;
    createStoryElement("Once upon a time ");
  }

  /*
   * Initializes a new StoryElement struct and adds it to the story.
   * This should populate the fresh struct with the given values.
   * @param _content the text associated with the StoryElement
   * @param _dateTime the date and time, in Moment.JS format, of publication
   * @return nothing
   */
  function createStoryElement(string memory _content) public payable {
    // Check if value is valid (not sure how to do within truffle at the moment)
    // require(msg.value == MINTING_PRICE + WRITING_FEE);
    // Get a new zero-initialized StoryElement struct, and populate it...
    StoryElement memory newElem;

    newElem.id = nextElementId;
    newElem.content = _content;
    newElem.dateTime = block.timestamp;
    newElem.author = msg.sender;

    if (nextElementId > 1) {
      newElem.nft = new NFT(msg.sender);
      string memory key = helper.uint2str(newElem.id);
      newElem.nft.mint(msg.sender, key, newElem.id, MINTING_PRICE);
    }
    nextElementId++;
    story.push(newElem);
  }

  /*
   * getFullStory serves as a getter for the story
   */
  function getFullStory() public view returns (StoryElement[] memory) {
    return story;
  }

  /*
   * getFullStory serves as a getter for an element within the story
   * If story with _id is not found, create error of type Panic(uint256)
   */
  function getStoryElement(uint256 _id) public view returns (StoryElement memory) {
    require(_id <= story.length && _id >= 1);
    return story[_id-1];
  }

  /*
   * removeFullStory is a function for development as a remove for an element within the story
   * If story with _id is not found, create error of type Panic(uint256)
   */
  function removeStoryElement(uint256 _id) public {
    require(_id <= story.length && _id >= 1);
    // Shift and pop
    uint idx_remove = _id-1;
    for (uint i = idx_remove; i < story.length - 1; i++) {
        story[i] = story[i + 1];
        story[i].id -= 1;
    }
    nextElementId--;
    story.pop();
  }
  /*
   * buyStoryElement allows you to attempt to purchase a story element's NFT
   */
  function buyStoryElement(uint256 _id) public payable {
    require(_id <= story.length && _id >= 1);
    story[_id-1].nft.buy{ value: msg.value }(msg.sender);
  }

  /*
   * listStoryElement allows you to attempt to list a story element's NFT (if you own it)
   */
  function listStoryElement(uint256 _id, uint256 new_price) public {
    require(_id <= story.length && _id >= 1);
    // Possible bug, the address of this call is Story address, not msg.sender, so we
    // may not be able to verify through ownerOnly modifier
    story[_id-1].nft.sell(msg.sender, new_price);
  }
}
