// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CreatorStaking is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    struct TokenData {
        address owner;
        string comment;
    }

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => TokenData) private comments;

    constructor() ERC721("Comment", "CMT") {}

    // call this function from the staking method
    function mint(string memory comment, address tokenOwner) private returns (uint256){
        uint256 newItemId = _tokenIdCounter.current();

        comments[newItemId] = TokenData(tokenOwner, comment);
        _tokenIdCounter.increment();
        _mint(address(this), newItemId);

        return newItemId;
    }

    function getComment(uint256 tokenId) public view returns (string memory) {
        return comments[tokenId].comment;
    }
}
