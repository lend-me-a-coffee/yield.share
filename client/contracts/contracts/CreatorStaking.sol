// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./ISwivel.sol";

contract Comment is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    // Swivel Constants
    address constant public DAI_RINKEBY = 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa;
    address constant public SWIVEL_RINKEBY = 0x4ccD4C002216f08218EdE1B13621faa80CecfC98;
    address constant public MARKETPLACE_RINKEBY = 0x9fa54f942D8b8e992501952C3e6E67F1A42595b8;
    uint16 constant public INTEREST_BPS = 500;
    uint16 constant public BPS_DENOMINATOR = 10000;

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

    // This contract needs to be approved by the user (sponsor) before calling this function 
    function stakeSwivel(string memory comment, uint256 amount, address tokenOwner) external returns (bool) {        
        // transferFrom user to contract
        Erc20(DAI_RINKEBY).transferFrom(tokenOwner, address(this), amount);
        Erc20(DAI_RINKEBY).approve(SWIVEL_RINKEBY, type(uint256).max);

        // initiate
        // Swivel(SWIVEL_RINKEBY).initiate(
        //     [["0xbcce14800c56e535ebb2a474d188430d1a5eb4b61a2f217be71d39b99adea9c1",     "0x3f60008Dfd0EfC03F476D9B489D6C5B13B3eBF2C",     "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",     false,     true,     "249749999999999990038528",     "30498591040009062580224",     "1669957199",     "1656135134" ]],
        //     [100],
        //     [["0x7e195145bcd76bf3bf188d18812a047061fdedaa871c45e9eea6eff437847e18", "0x1a88f8b836f4cdb51412d0a123c3bb1c1234997d05b3b2e78589cc4a6292a73f", "28"]]
        // );

        // send creator interest payments
        Erc20(DAI_RINKEBY).transfer(owner(), amount * INTEREST_BPS / BPS_DENOMINATOR);
        
        return true;
    }
}
