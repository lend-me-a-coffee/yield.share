import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const prismaConnection = async () => {
    await prisma.$connect();
    return prisma;
}

export interface Creator {
    name: string;
    links: { name: string; link: string };
    address: string;
    description: string;
    photo: string;
}

export interface CreatorData extends Creator {
    nfts: string[];
}
