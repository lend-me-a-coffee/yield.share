import {ethers} from "ethers";
import {Comment__factory} from "../contracts";

export enum WalletType {
    optimism = "optimism",
    polygon = "Polygon",
    cronos = "Cronos",
    skale = "Skale",
    boba = "Boba"
}

export const toWalletType = (wallet: string) => {
    const lowerCase = wallet.toLowerCase();
    switch (lowerCase) {
        case WalletType.optimism.toString():
            return WalletType.optimism;
        case WalletType.polygon.toString():
            return WalletType.polygon;
        case WalletType.cronos.toString():
            return WalletType.cronos;
        case WalletType.skale.toString():
            return WalletType.skale;
        case WalletType.boba.toString():
            return WalletType.boba;
        default:
            throw new Error(`Type ${lowerCase} not recognized!`);
    }
}

export abstract class Wallet {
    public readonly web3: ethers.providers.JsonRpcProvider;

    constructor(endpoint: string, public readonly type: WalletType) {
        this.web3 = new ethers.providers.JsonRpcProvider(endpoint);
    }

    public async getNFT(token: number, contractAddress: string): Promise<string> {
        const nftContract = Comment__factory.connect(contractAddress, this.web3);
        const uri = await nftContract.tokenURI(token);
        return uri;
    }

    public async getAllNftMetadata(contractAddress: string): Promise<string[]> {
        const nftContract = Comment__factory.connect(contractAddress, this.web3);
        const countBn = await nftContract.count();
        const count = countBn.toNumber();

        const nft: Promise<string>[] = [];
        for (let i = 0; i < count; i++) {
            nft.push(nftContract.tokenURI(i));
        }

        return Promise.all(nft);
    }

    public async getBlock(): Promise<number> {
        return this.web3.getBlockNumber();
    }
}