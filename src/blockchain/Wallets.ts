import {Wallet, WalletType} from "./Wallet";

export class OptimismWallet extends Wallet {
    constructor() {
        super(process.env.OPTIMISM_ENDPOINT!, WalletType.Optimism);
    }
}

export class PolygonWallet extends Wallet {
    constructor() {
        super(process.env.POLYGON_ENDPOINT!, WalletType.Polygon);
    }
}

export class CronosWallet extends Wallet {
    constructor() {
        super(process.env.CRONOS_ENDPOINT!, WalletType.Cronos);
    }
}

export class SkaleWallet extends Wallet {
    constructor() {
        super(process.env.SKALE_ENDPOINT!, WalletType.Skale);
    }
}

export class BobaWallet extends Wallet {
    constructor() {
        super(process.env.BOBA_ENDPOINT!, WalletType.Boba);
    }
}

export async function reportWalletStatuses(): Promise<{name:string, lastBlock:number}[]> {
    const wallets: Wallet[] = [
        new OptimismWallet(),
        new PolygonWallet(),
        new CronosWallet(),
        new SkaleWallet(),
        new BobaWallet()
    ];

    const promises: Promise<{name:string, lastBlock:number}>[] = [];

    for (const wallet of wallets) {
        promises.push(new Promise(res => {
            wallet.getBlock()
                .then(nr => res({name: wallet.type.toString(), lastBlock: nr}))
                .catch(_ => res({name: wallet.type.toString(), lastBlock: -1}));
        }));
    }

    return await Promise.all(promises);
}