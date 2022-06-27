import {Comment, Creator} from "./index";
import {IWallet, toWalletType} from "../blockchain/Wallets/Wallet";
import {getWalletByType} from "../blockchain/Wallets/Wallets";
import {PrismaClient} from "@prisma/client";
import {fetchData} from "../blockchain/ipfsApi";
import {CommentMetadata} from "../blockchain";

const prisma = new PrismaClient();

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
        const metadatas: CommentMetadata[] = await Promise.all(commentData.map(ci => fetchData<CommentMetadata>(ci)));
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
