// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DeepSquare.sol";

contract Bridge {
    DeepSquare public token;
    uint256 DPS_MIN_BALANCE = 25000e18;

    event SwapDPStoSQUARE(address indexed account, uint256 amount);
    event SwapSQUAREtoDPS(address indexed account, uint256 amount);

    constructor(DeepSquare _token) {
        token = _token;
    }

    function _isEligible(address account) internal view returns (bool) {
        address[] memory sender = new address[](2);
        sender[0] = account;
        sender[1] = account;

        uint256[] memory ids = new uint256[](2);
        ids[0] = token.DPS();
        ids[1] = token.SQUARE();

        uint256[] memory balances = token.balanceOfBatch(sender, ids);

        return (balances[0] + balances[1]) >= DPS_MIN_BALANCE;
    }

    modifier onlyEligible() {
        require(_isEligible(msg.sender), "Bridge: sender is not eligible");
        _;
    }

    function swapDPStoSQUARE(uint256 amountDPS) external {
        token.burn(msg.sender, token.DPS(), amountDPS);
        token.mint(msg.sender, token.SQUARE(), amountDPS, "");
        emit SwapDPStoSQUARE(msg.sender, amountDPS);
    }

    function swapSQUAREtoDPS(uint256 amountSQUARE) external onlyEligible {
        token.burn(msg.sender, token.SQUARE(), amountSQUARE);
        token.mint(msg.sender, token.DPS(), amountSQUARE, "");
        emit SwapSQUAREtoDPS(msg.sender, amountSQUARE);
    }
}
