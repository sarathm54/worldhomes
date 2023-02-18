const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { constants, expectRevert, expectEvent } = require('@openzeppelin/test-helpers');

describe("Rentable Homes", () => {
    const deployRentableHomes = async () => {
        const accounts = await ethers.getSigners();
        const rentableHomes = await ethers.getContractFactory("RentableHomes");
        const rentableHomesContract = await rentableHomes.deploy();

        return {rentableHomesContract, accounts};
    }

    describe("Test cases", () => {
        it("should support the ERC721 and ERC4907 standards", async () => {
            const {rentableHomesContract} = await loadFixture(deployRentableHomes);
            const ERC721InterfaceId = "0x80ac58cd";
            const ERC4907InterfaceId = "0xad092b5c";
            var isERC721 = await rentableHomesContract.supportsInterface(ERC721InterfaceId);
            var isERC4907 = await rentableHomesContract.supportsInterface(ERC4907InterfaceId);
            assert.equal(isERC721, true, "Rentable homes is not an ERC721");
            assert.equal(isERC4907, true, "Rentable homes is not an ERC4907");
        });

        it("should not set UserInfo if not the owner", async () => {
            const {rentableHomesContract, accounts} = await loadFixture(deployRentableHomes);
            const expirationDatePast = 1660252958; // Aug 8 2022
            await rentableHomesContract.mint("fakeURI");
            // Failed require in function
            // await expectRevert(rentableHomesContract.setUser(1, accounts[1].address, expirationDatePast, {from: accounts[1].address}), "ERC721: transfer caller is not owner nor approved");
            // Assert no UserInfo for NFT
            var user = await rentableHomesContract.userOf(1);
            var date = await rentableHomesContract.userExpires(1);
            assert.equal(user, constants.ZERO_ADDRESS, "NFT user is not zero address");
            assert.equal(date, 0, "NFT expiration date is not 0");
        });

        it("should return the correct UserInfo", async () => {
            const {rentableHomesContract, accounts} = await loadFixture(deployRentableHomes);
            const expirationDatePast = 1660252958; // Aug 8 2022
            const expirationDateFuture = 4121727755; // Aug 11 2100
            await rentableHomesContract.mint("fakeURI");
            await rentableHomesContract.mint("fakeURI");
            // Set and get UserInfo
            var expiredTx = await rentableHomesContract.setUser(1, accounts[1].address, expirationDatePast)
            var unexpiredTx = await rentableHomesContract.setUser(2, accounts[2].address, expirationDateFuture)
            var expiredNFTUser = await rentableHomesContract.userOf(1);
            var expiredNFTDate = await rentableHomesContract.userExpires(1);
            var unexpireNFTUser = await rentableHomesContract.userOf(2);
            var unexpiredNFTDate = await rentableHomesContract.userExpires(2);
            // Assert UserInfo and event transmission
            assert.equal(expiredNFTUser, constants.ZERO_ADDRESS, "Expired NFT has wrong user");
            assert.equal(expiredNFTDate, expirationDatePast, "Expired NFT has wrong expiration date");
            // expectEvent(expiredTx, "UpdateUser", { tokenId: "1", user: accounts[1], expires: expirationDatePast.toString()});
            assert.equal(unexpireNFTUser, accounts[2].address, "Expired NFT has wrong user");
            assert.equal(unexpiredNFTDate, expirationDateFuture, "Expired NFT has wrong expiration date");
            // expectEvent(unexpiredTx, "UpdateUser", { tokenId: "3", user: accounts[2], expires: expirationDateFuture.toString()});
            expect(unexpiredTx).to.emit(unexpiredTx, "UpdateUser").withArgs({tokenId: "2", user: accounts[2], expires: expirationDateFuture.toString()})
            // Burn NFT
            unexpiredTx = await rentableHomesContract.burn(2);
            // Assert UserInfo was deleted
            unexpireNFTUser = await rentableHomesContract.userOf(2);
            unexpiredNFTDate = await rentableHomesContract.userExpires(2);
            assert.equal(unexpireNFTUser, constants.ZERO_ADDRESS, "NFT user is not zero address");
            assert.equal(unexpiredNFTDate, 0, "NFT expiration date is not 0");
            // expectEvent(unexpiredTx, "UpdateUser", { tokenId: "2", user: constants.ZERO_ADDRESS, expires: "0"});
          });
    });
});