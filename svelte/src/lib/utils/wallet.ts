import { ethers } from "ethers";

export async function connectWallet(): Promise<ethers.providers.JsonRpcProvider> {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(account);
    console.log(provider);

    return provider;

    // const add = await provider.getSigner();
    // const address = await add.getAddress();
    // console.log("add", address);
    // return address;
}

export async function disconnectWallet(): Promise<string[]> {
    return await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }]
    });
}
