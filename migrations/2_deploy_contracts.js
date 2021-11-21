const NFT = artifacts.require("./contracts/Nft.sol");
const Story = artifacts.require("./contracts/Story.sol");

module.exports = function(deployer) {
  deployer.deploy(Story);
  // deployer.deploy(NFT, address(this)
  // Story creates NFT's on demand, no need for deployment (https://ethereum.stackexchange.com/questions/29812/truffle-migrate-how-to-deploy-a-contract-whose-constructor-takes-a-parameter/29856)
};