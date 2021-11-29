const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const seed_phrase = 'call issue cook define oak alley refuse chaos admit owner palace plug';
const infura_rinkeby_link = 'https://rinkeby.infura.io/v3/3137d9a4c5794bd1abe2ccc1370154f1';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(seed_phrase, infura_rinkeby_link),
      network_id: 4,    // Rinkeby's id
      gas: 5500000,      // Rinkeby has a lower block limit than mainnet
      confirmations: 2, 
      timeoutBlocks: 2000,
      skipDryRun: true
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  compilers: {
    solc: {
      version: '0.8.0', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
};
