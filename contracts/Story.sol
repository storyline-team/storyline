pragma solidity ^0.5.0;
 
/**
 * @title Story Smart Contract
 * @notice Primary smart contract for running Storyline operations.
 */
contract Story {
  /**
   * StoryElement Struct.
   * A single piece of Storyline content, published by a writer.
   * @dev Any metadata about story content should go here.
   */
  struct StoryElement {
    uint256 id;
    string content;
    string dateTime;
  }

  /**
   * StoryElement Master List.
   * List of StoryElement structs, in published order.
   * StoryLine should traverse this to build the latest story.
   * @dev Newly published StoryElements should go here.
   */
  StoryElement[] story;

  /**
   * Next available StoryElement id.
   * This should realistically never reach the maximum representation.
   */
  uint256 nextElementId = 1;

  /**
   * Story contract constructor.
   * @dev This should initialize the default story to "Once upon a time "
   */
  constructor() public {
    // TODO: Implement me
  }

  /**
   * Initializes a new StoryElement struct and adds it to the story.
   * This should populate the fresh struct with the given values.
   * @param _content the text associated with the StoryElement
   * @param _dateTime the date and time, in Moment.JS format, of publication
   * @return nothing
   */
  function createStoryElement(
    string memory _content, 
    string memory _dateTime
  ) public { 
    // Get a new zero-initialized StoryElement struct, and populate it...
    StoryElement memory newElem;

    newElem.id = nextElementId;
    nextElementId++;

    newElem.content = _content;

    newElem.dateTime = _dateTime;

    story.push(newElem);
  }

  /**
   * TODO: write this function header
   */
  /* TODO: Implement function
  function getFullStory() public returns (StoryElement[]) {}
  */


  /**
   * TODO: write this function header
   */
  /* TODO: Implement function
  function getStoryElement(uint256 memory _id) public returns (StoryElement) {}
  */

}
