require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "mumbai",
  solidity: "0.8.17",
  etherscan: {
    apiKey: '1MFGMGCMSQ3DVZETBK68WAWBFDCUCZIQ87'
  },
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/EmGgg8-a9AEgVyHzaDvNsKkB4GcpChP3",
      accounts: ['173bcac8587a9fa2b30d2f9177776d5aacce95aac5172507b453eef40989180f']
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      // accounts: [privateKey1, privateKey2, ...]
    }
  },
};
