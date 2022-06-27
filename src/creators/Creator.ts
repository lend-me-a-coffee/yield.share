import {Comment, Creator} from "./index";
import {IWallet, TokenData, toWalletType} from "../blockchain/Wallets/Wallet";
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

    private async fetchCommentsFromDatabase(hash: string): Promise<Comment | null> {
        await prisma.$connect();
        const comment = await prisma.comment.findUnique({
            where: {
                address: hash
            }
        });
        if (comment) {
            return {
                amount: comment.amount,
                author: comment.author ?? undefined,
                duration: comment.duration,
                id: comment.tokenId,
                text: comment.text
            }
        }
        return null;
    }

    private async saveCommentInDatabase(comment: Comment, hash: string): Promise<void> {
        await prisma.$connect();
        const dbComment = {...comment, address: hash, tokenId: comment.id};
        await prisma.comment.create({data: dbComment});
    }

    private async fetchComment({id, url}: TokenData): Promise<Comment> {
        const dbComment = await this.fetchCommentsFromDatabase(url);
        if (dbComment) {
            return dbComment;
        }
        const comment = await fetchData<CommentMetadata>(url);
        const parsedComment: Comment = {
            text: comment.name,
            author: comment.author,
            id,
            amount: comment.attributes.find(a => a.trait_type === "staked amount")?.value ?? 0,
            duration: comment.attributes.find(a => a.trait_type === "duration")?.value ?? 0,
        };

        await this.saveCommentInDatabase(parsedComment, url);

        return parsedComment;

    }

    public async getComments(): Promise<Comment[]> {
        const commentData = await this.wallet.getAllNftMetadata(this.data.address);
        const comments: Comment[] = await Promise.all(commentData.map(ci => this.fetchComment(ci)));
        return comments;
    }
}
