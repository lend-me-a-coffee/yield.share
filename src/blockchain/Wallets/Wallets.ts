import {IWallet, WalletType} from "./Wallet";
import {EthersWallet} from "./EthersWallet";
import {TatumWallet} from "./TatumWallet";

export class OptimismWallet extends EthersWallet {
    constructor() {
        super(process.env.OPTIMISM_ENDPOINT!, WalletType.optimism);
    }
}

export class PolygonWallet extends TatumWallet {
    constructor() {
        super(WalletType.polygon);
    }
}

export class CronosWallet extends EthersWallet {
    constructor() {
        super(process.env.CRONOS_ENDPOINT!, WalletType.cronos);
    }
}

export class SkaleWallet extends EthersWallet {
    constructor() {
        super(process.env.SKALE_ENDPOINT!, WalletType.skale);
    }
}

export class BobaWallet extends EthersWallet {
    constructor() {
        super(process.env.BOBA_ENDPOINT!, WalletType.boba);
    }
}

export class RinkebyWallet extends TatumWallet {
    constructor() {
        super(WalletType.rinkeby);
    }
}

export const getWalletByType = (type: WalletType): IWallet => {
    switch (type) {
        case WalletType.optimism:
            return new OptimismWallet();
        case WalletType.polygon:
            return new PolygonWallet();
        case WalletType.cronos:
            return new CronosWallet();
        case WalletType.skale:
            return new SkaleWallet();
        case WalletType.boba:
            return new BobaWallet();
        case WalletType.rinkeby:
            return new RinkebyWallet();
    }
    throw new Error(`Wallet ${type} does not exists`)
}

export async function reportWalletStatuses(): Promise<{ name: string, lastBlock: number }[]> {
    const wallets: IWallet[] = [
        new OptimismWallet(),
        new PolygonWallet(),
        new CronosWallet(),
        new SkaleWallet(),
        new BobaWallet(),
        new RinkebyWallet()
    ];

    const promises: Promise<{ name: string, lastBlock: number }>[] = [];

    for (const wallet of wallets) {
        promises.push(new Promise(res => {
            wallet.getBlock()
                .then(nr => res({name: wallet.type.toString(), lastBlock: nr}))
                .catch(err => {
                    console.warn(wallet.type, err);
                    res({name: wallet.type.toString(), lastBlock: -1})
                });
        }));
    }

    return await Promise.all(promises);
}