// SPDX-License-Identifier: MIT
/*
 * Work in progress
 */
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721, ERC721URIStorage, ERC721Enumerable {
    address payable public _owner;
    bool public selling;
    uint256 public price;
    uint256 public token_id;
    event Purchase(address owner, uint256 price, uint256 id, string uri);
    event AttemptPurchase(address owner, uint256 price, uint256 id, string uri);

    constructor(address origin) ERC721("StoryElement", "SE") {
        _owner = payable(origin);
        price = 0;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    function isForSale() public view returns (bool) {
        return selling;
    }

    function getPrice() public view returns (uint256) {
        return price;
    }

    /*
     * Overrides
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 _token_id
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, _token_id);
    }

    function _burn(uint256 _token_id)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(_token_id);
    }

    function tokenURI(uint256 _token_id)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(_token_id);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    modifier onlyOwner(address origin) {
        require(origin == _owner);
        _;
    }

    function mint(
        address origin,
        string memory _tokenURI,
        uint256 _token_id,
        uint256 _price
    ) public onlyOwner(origin) returns (bool) {
        //uint256 _token_id = totalSupply() + 1;
        // @dev console.log not showing up
        //console.log("TOKEN: %d", _token_id);
        price = _price;
        token_id = _token_id;
        _mint(address(this), _token_id);
        _setTokenURI(_token_id, _tokenURI);
        return true;
    }

    function buy(address origin) external payable {
        // _validate();
        emit AttemptPurchase(origin, price, token_id, tokenURI(token_id));
        require(selling, "Error, Token is not being sold");
        require(msg.value >= price, "Error, Token costs more");
        // _trade(origin);
        // _transfer(address(this), origin, token_id);
        _owner.transfer(msg.value);
        _owner = payable(origin);
        selling = false;
        emit Purchase(origin, price, token_id, tokenURI(token_id));
    }

    function sell(address origin, uint256 new_price)
        external
        onlyOwner(origin)
    {
        price = new_price;
        selling = true;
    }

    function _validate() internal {
        require(selling, "Error, Token is not being sold");
        require(msg.value >= price, "Error, Token costs more");
    }

    function _trade(address origin) internal {
        _transfer(address(this), origin, token_id);
        _owner.transfer(msg.value);
        selling = false;
    }
}
