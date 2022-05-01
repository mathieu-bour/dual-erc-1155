// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DeepSquare.sol";

contract Faucet {
    DeepSquare public token;

    constructor(DeepSquare _token) {
        token = _token;
    }

    function mintDPS(uint256 amountDPS) external {
        token.mint(msg.sender, token.DPS(), amountDPS, "");
    }

    function burnDPS(uint256 amountDPS) external {
        token.burn(msg.sender, token.DPS(), amountDPS);
    }
}
