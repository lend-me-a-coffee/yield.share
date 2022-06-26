import {ethers} from "ethers";
import {Comment__factory} from "../contracts";

export enum WalletType {
    None,
    Optimism = "Optimism",
    Polygon = "Polygon",
    Cronos = "Cronos",
    Skale = "Skale",
    Boba = "Boba"
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