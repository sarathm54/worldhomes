require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
const contract = require("../artifacts/contracts/RentableHomes.sol/RentableHomes.json");
const contractInterface = contract.abi;

let provider = ethers.provider;

const tokenCID = "https://bafkreigfntoalhqccckyitt5vubnmd5m3f3jnlx3maqpv6ahoabjvanyha.ipfs.nftstorage.link";
const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);

wallet.provider = provider;
const signer = wallet.connect(provider);

const nft = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractInterface,
  signer
);

// const main = () => {
//   console.log("Waiting for 5 blocks to confirm...");
//   nft
//     .mint(tokenCID)
//     .then((tx) => tx.wait(5))
//     .then((receipt) => console.log(`Confirmed! Your transaction receipt is: ${receipt.transactionHash}`))
//     .catch((e) => console.log("Something went wrong", e));
// };

// main();