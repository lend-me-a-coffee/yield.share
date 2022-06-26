import {PrismaClient} from "@prisma/client";
import {CommentMetadata} from "../blockchain";

const prisma = new PrismaClient();

const prismaConnection = async () => {
    await prisma.$connect();
    return prisma;
}

export interface Creator {
    name: string;
    links: string[];
    address: string;
    description: string;
    photo: string;
}

interface Comment {
    text: string;
    author: string;
    amount: number;
    duration: number;
}

export interface CommentInput {
    creatorAddress: string;
    comment: string;
    amount: number;
    duration: number;
}

export interface CreatorData extends Creator {
    comments: Comment[];
}

export async function fetchUser(id: string): Promise<Creator | null> {
    const client = await prismaConnection();
    return client.creator.findUnique({
        where: {
            address: id,
        }
    });
}

export async function fetchAllUsers(): Promise<Creator[]> {
    const client = await prismaConnection();
    return client.creator.findMany();
}

export async function createUser(creator: Creator): Promise<void> {
    const client = await prismaConnection();

    await client.creator.create({data: creator});
}

export async function generateCommentMetadata(input: CommentInput): Promise<CommentMetadata> {
    const client = await prismaConnection();
    const creator = await client.creator.findUnique({
        where: {
            address: input.creatorAddress,
        }
    });

    if (!creator) {
        throw new Error(`Creator ${input.creatorAddress} not found!`);
    }

    return {
        description: `Comment for creator ${input.creatorAddress}`,
        external_url: "",
        image: creator.photo,
        name: input.comment,
        attributes: [
            {trait_type: "duration", value: input.duration},
            {trait_type: "staked amount", value: input.amount}
        ]
    }
}