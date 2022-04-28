// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract DeepSquare is ERC1155 {
    uint256 public DPS = 1;
    uint256 public SQUARE = 2;
    uint256 public INITIAL_SUPPLY = 210e6 * 1e18;

    constructor() ERC1155("https://dual-erc-1155.mathieu-bour.fr/api/tokens/{id}") {
        uint256[] memory tokens = new uint256[](2);
        tokens[0] = DPS;
        tokens[1] = SQUARE;

        uint256[] memory supplies = new uint256[](2);
        supplies[0] = INITIAL_SUPPLY;
        supplies[1] = INITIAL_SUPPLY;

        _mintBatch(msg.sender, tokens, supplies, "");
    }
}
