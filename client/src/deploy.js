import commentJson from './artifacts/contracts/CreatorStaking.sol/Comment.json'
import { ethers } from "ethers";
import { FormatTypes, Interface } from "@ethersproject/abi";

export function deploy() {
    const abi = new Interface(commentJson.abi);
    abi.format(FormatTypes.full);
    const bytecode = commentJson.bytecode;

    // Connect to the network
    let provider = ethers.getDefaultProvider('rinkeby');

    // Load the wallet to deploy the contract with
    let privateKey = '0x44d45a4af99c81fbc5065012ba618ad71b75c6e1382e15bbd6dc184024bf40b1';
    let wallet = new ethers.Wallet(privateKey, provider);

    // Deployment is asynchronous, so we use an async IIFE
    (async function() {

        // Create an instance of a Contract Factory
        let factory = new ethers.ContractFactory(abi, bytecode, wallet);

        // Notice we pass in "Hello World" as the parameter to the constructor
        let contract = await factory.deploy({ gasLimit: 5000000 });

        // The address the Contract WILL have once mined
        // See: https://ropsten.etherscan.io/address/0x2bd9aaa2953f988153c8629926d22a6a5f69b14e
        console.log(contract.address);
        // "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E"

        // The transaction that was sent to the network to deploy the Contract
        // See: https://ropsten.etherscan.io/tx/0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51
        console.log(contract.deployTransaction.hash);
        // "0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51"

        // The contract is NOT deployed yet; we must wait until it is mined
        await contract.deployed()

        // Done! The contract is deployed.
    })();
}
