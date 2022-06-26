// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Comment is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => address) private comments;

    struct Staker {
        address payable staker;
        uint256 amount;
        uint256 deadline;
    }

    mapping(uint256 => Staker) public stakers;

    constructor() ERC721("Comment", "CMT") {}

    function stake(uint256 deadline, string memory uri) external payable returns (uint256) {
        require(msg.value > 0, 'amount must be greater than 0');
        uint256 id = mint(uri, msg.sender);
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

        if (stakers[id].deadline > block.timestamp) {
            _burn(id);
        } else {
            _transfer(address(this), staker, id);
        }

        return amount;
    }

    // call this function from the staking method
    function mint(string memory uri, address tokenOwner) private returns (uint256){
        uint256 tokenId = _tokenIdCounter.current();

        comments[tokenId] = tokenOwner;
        _tokenIdCounter.increment();
        _mint(address(this), tokenId);
        _setTokenURI(tokenId, uri);

        return tokenId;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
