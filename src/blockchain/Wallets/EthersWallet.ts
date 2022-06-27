import {ethers} from "ethers";
import {Comment__factory} from "../../contracts";
import {IWallet, TokenData, WalletType} from "./Wallet";

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

    public async getAllNftMetadata(contractAddress: string): Promise<TokenData[]> {
        const nftContract = Comment__factory.connect(contractAddress, this.web3);
        const countBn = await nftContract.count();
        const count = countBn.toNumber();

        const nfts: Promise<{ id: number, url: string } | null>[] = [];
        for (let i = 0; i < count; i++) {
            nfts.push(new Promise<{ id: number, url: string } | null>(res => {
                nftContract.tokenURI(i).then(nft => res({id: i, url: nft}))
                    .catch(_ => {
                        console.warn(`NFT ${i} for ${contractAddress} has been burnt`);
                        res(null)
                    });
            }));
        }

        const resolvedPromises = await Promise.all(nfts);
        return resolvedPromises.filter(f => !!f && f.url !== undefined && f.url !== null) as TokenData[];
    }

    public async getBlock(): Promise<number> {
        return this.web3.getBlockNumber();
    }
}