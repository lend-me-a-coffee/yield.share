import {ethers} from "ethers";
import {Comment__factory} from "../../contracts";
import {IWallet, WalletType} from "./Wallet";

export abstract class EthersWallet implements IWallet {
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

        const nfts: Promise<string | null>[] = [];
        for (let i = 0; i < count; i++) {
            nfts.push(new Promise<string | null>(res => {
                nftContract.tokenURI(i).then(nft => res(nft))
                    .catch(_ => {
                        console.warn(`NFT ${i} for ${contractAddress} has been burnt`);
                        res(null)
                    });
            }));
        }

        const resolvedPromises = await Promise.all(nfts);
        return resolvedPromises.filter(f => f !== undefined && f !== null) as string[];
    }

    public async getBlock(): Promise<number> {
        return this.web3.getBlockNumber();
    }
}