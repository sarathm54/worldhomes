// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.4.22 <0.9.0;

import "./RentableHomes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract RentalMarket is RentableHomes, ReentrancyGuard {

    struct NFT {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint64 rentalTimestamp;
        uint256 price;
        bool listed;
    }

    event NFTListed(
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price
    );

    mapping (uint256 => NFT) internal _market;
    constructor() {}

    /// @notice Complete a renting process by paying token
    /// @param tokenId the token to rent
    function rentHome(uint tokenId) public payable nonReentrant {
        NFT storage nft = _market[tokenId];
        require(nft.tokenId > 0, "Token not found in the market");
        require(msg.value >= nft.price, "Amount is not sufficient for completing this transaction");

        address payable buyer = payable(msg.sender);
        payable(nft.seller).transfer(msg.value);
        ERC4907.setUser(tokenId, buyer, nft.rentalTimestamp);
    }

    /// @notice List a property in the market
    /// @param tokenId TokenId to be listed in the market
    function listProperty(uint tokenId, uint256 price, uint64 rentalTimestamp) public nonReentrant {
        ERC721.transferFrom(msg.sender, address(this), tokenId);
        _market[tokenId] = NFT(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            rentalTimestamp,
            price,
            true
        );
        emit NFTListed(tokenId, msg.sender, address(this), price);
    }
}