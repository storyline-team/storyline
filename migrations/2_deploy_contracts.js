const NFT = artifacts.require("./contracts/Nft.sol");
const Story = artifacts.require("./contracts/Story.sol");

module.exports = function(deployer) {
  deployer.deploy(Story);
  deployer.deploy(NFT)
};