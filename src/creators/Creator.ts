import { Comment, Creator } from "./index";
import { IWallet, toWalletType, WalletType } from "../blockchain/Wallets/Wallet";
import { getWalletByType } from "../blockchain/Wallets/Wallets";
import { PrismaClient } from "@prisma/client";
import { fetchData } from "../blockchain/ipfsApi";
import { CommentMetadata } from "../blockchain";

const prisma = new PrismaClient();

const isTatumWallet = (wallet: IWallet) => {
    return wallet.type === WalletType.rinkeby || wallet.type === WalletType.polygon;
}

export class CreatorManager {
    private readonly wallet: IWallet;
    constructor(private readonly data: Creator) {
        const walletType = toWalletType(data.chain);
        this.wallet = getWalletByType(walletType);
    }

    public getUserData(): Creator {
        return this.data;
    }

    public async fetchCommentsFromDatabase(hash: string): Promise<Comment | null> {
        await prisma.$connect();
        return await prisma.comment.findUnique({
            where: {
                address: hash
            }
        });
    }

    public async getComments(): Promise<Comment[]> {
        const commentData = await this.wallet.getAllNftMetadata(this.data.address);
        let metadatas: CommentMetadata[] = [];
        if (isTatumWallet(this.wallet)) {
            metadatas = commentData.map(cd => JSON.parse(cd));
        } else {
            metadatas = await Promise.all(commentData.map(ci => fetchData<CommentMetadata>(ci)));
        }
        const parsedMetadata = metadatas.map(nft => {
            return {
                text: nft.name,
                author: this.data.address,
                amount: nft.attributes.find(a => a.trait_type === "staked amount")?.value,
                duration: nft.attributes.find(a => a.trait_type === "duration")?.value,
            }
        });
        return parsedMetadata;
    }
}
