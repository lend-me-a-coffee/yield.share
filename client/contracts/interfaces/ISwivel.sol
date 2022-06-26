// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.4;

import '../contracts/Swivel/Hash.sol';
import '../contracts/Swivel/Sig.sol';

interface Erc20 {
	function approve(address, uint256) external returns (bool);
	function transfer(address, uint256) external returns (bool);
	function balanceOf(address) external returns (uint256);
	function transferFrom(address, address, uint256) external returns (bool);
}

interface Swivel {
    function initiate(Hash.Order[] calldata o, uint256[] calldata a, Sig.Components[] calldata c) external returns (bool);
    // exitZcTokenFillingZcTokenInitiate
    function exit(Hash.Order[] calldata o, uint256[] calldata a, Sig.Components[] calldata c) external returns (bool);
}