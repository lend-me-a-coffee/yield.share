// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
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

    struct Staker {
        address payable staker;
        uint256 amount;
        uint256 deadline;
    }

    mapping(uint256 => Staker) public stakers;

    function stake(uint256 deadline, string memory comment) external payable returns (uint256) {
        require(msg.value > 0, 'amount must be greater than 0');
        uint256 id = mint(comment, msg.sender);
        stakers[id] = Staker(payable(msg.sender), msg.value, deadline);
        return id;
    }

    function unstake(uint256 id) external payable returns (uint256) {
        uint256 amount = stakers[id].amount;
        address payable staker = stakers[id].staker;
        require(amount > 0, 'sender must have deposits greater than 0');
        require(msg.sender == staker, 'sender must own the nft');
        
        stakers[id].amount = 0;
        staker.transfer(amount);
        
        return amount;
    }

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
