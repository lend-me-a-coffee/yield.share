import { connectWallet, disconnectWallet } from "../utils/wallet";
import { writable } from "svelte/store";
import type { ethers } from "ethers";

function createAuthWallet() {
    const { subscribe, set } = writable<string>();

    return {
        subscribe,
        signIn: async () => {
            const provider = await connectWallet();
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            set(address[0]);
        },
        signOff: async () => {
            const wallets = await disconnectWallet();
            console.log(wallets);
        }
    }
}

function createProvider() {
    const {subscribe, set } = writable<ethers.providers.JsonRpcProvider>();

    return {
        subscribe,
        signIn: async () => {
            const wallets = await connectWallet();
            set(wallets);
        },
    }
}

export const authWallet = createAuthWallet();
export const provider = createProvider();
