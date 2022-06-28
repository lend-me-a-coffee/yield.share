import {IWallet, TokenData, WalletType} from "./Wallet";
import axios from "axios";

export class TatumWallet implements IWallet {
    private readonly chain: "ETH" | "MATIC";
    private readonly headers: Record<string, string | Record<string, string>>;

    constructor(public readonly type: WalletType) {
        this.headers = {
            headers: {
                "x-api-key": process.env.TATUM_API!
            }
        };
        switch (type) {
            case WalletType.rinkeby:
                this.chain = "ETH";
                this.headers = {
                    headers: {
                        "x-testnet-type": "ethereum-rinkeby",
                        "x-api-key": process.env.TATUM_API!
                    }
                };
                break;
            case WalletType.polygon:
                this.chain = "MATIC";
                break;
            case WalletType.ropsten:
                this.chain = "ETH";
                break;
            default:
                throw new Error(`Network ${type} is not supported by Tatum.io!`);
        }
    }

    async getAllNftMetadata(contractAddress: string): Promise<TokenData[]> {
        const query = new URLSearchParams({
            pageSize: "50",
            offset: "0"
        }).toString();
        const fetch = await axios.get(`https://api-eu1.tatum.io/v3/nft/collection/${this.chain}/${contractAddress}?${query}`, this.headers);

        if (fetch.data) {
            type metadata = { tokenId: string, metadata: { url: string, metadata: Record<string, string>, tokenId: string } };
            const data: metadata[] = fetch.data;
            return data.map(d => {
                return {id: Number(d.tokenId), url: d.metadata.url}
            });
        }

        console.warn("No data for", contractAddress);
        return [];
    }

    async getNFT(token: number, contractAddress: string): Promise<string> {
        const fetch = await axios.get(`https://api-eu1.tatum.io/v3/nft/metadata/${this.chain}/${contractAddress}/${token}`, this.headers);
        return fetch.data;
    }

    async getBlock(): Promise<number> {
        const chainName = this.chain == "ETH" ? "ethereum" : "polygon";
        const fetch = await axios.get(`https://api-eu1.tatum.io/v3/${chainName}/block/current`, this.headers);
        return fetch.data;
    }
}