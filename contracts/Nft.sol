// SPDX-License-Identifier: MIT
/*
 * Work in progress
*/
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    address payable public _owner;
    mapping(uint256 => bool) public sold;
    mapping(uint256 => uint256) public price;
    event Purchase(address owner, uint256 price, uint256 id, string uri);
    constructor() ERC721("StoryElement", "SE") {
        _owner = payable(msg.sender);
    }

    /* 
     * Overrides
    */ 
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _tokenURI, uint256 _price) public onlyOwner returns (bool)
    {
        uint256 _tokenId = totalSupply() + 1;
        price[_tokenId] = _price;
        _mint(address(this), _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        return true;
    }

    function buy(uint256 _id) external payable {
        _validate(_id); 
        _trade(_id);
        emit Purchase(msg.sender, price[_id], _id, tokenURI(_id));
    }

    function _validate(uint256 _id) internal {
        require(_exists(_id), "Error, wrong Token id");
        require(!sold[_id], "Error, Token is sold");
        require(msg.value >= price[_id], "Error, Token costs more"); 
    }

    function _trade(uint256 _id) internal {
        _transfer(address(this), msg.sender, _id);
        _owner.transfer(msg.value);
        sold[_id] = true;
    }
}
