export enum WalletType {
    optimism = "optimism",
    polygon = "polygon",
    cronos = "cronos",
    skale = "skale",
    boba = "boba",
    rinkeby = "rinkeby",
    ropsten = "ropsten"
}

export const toWalletType = (wallet: string) => {
    const lowerCase = wallet.toLowerCase();
    switch (lowerCase) {
        case WalletType.optimism.toString():
            return WalletType.optimism;
        case WalletType.polygon.toString():
            return WalletType.polygon;
        case WalletType.cronos.toString():
            return WalletType.cronos;
        case WalletType.skale.toString():
            return WalletType.skale;
        case WalletType.boba.toString():
            return WalletType.boba;
        case WalletType.rinkeby.toString():
            return WalletType.rinkeby;
        case WalletType.ropsten.toString():
            return WalletType.ropsten;
        default:
            throw new Error(`Type ${lowerCase} not recognized!`);
    }
}

export const isTatumWallet = (wallet: IWallet) => {
    return wallet.type === WalletType.rinkeby || wallet.type === WalletType.polygon;
}

export interface IWallet {
    type: WalletType;
    getNFT(token: number, contractAddress: string): Promise<string>;

    getAllNftMetadata(contractAddress: string): Promise<TokenData[]>;

    getBlock(): Promise<number>;
}

export interface TokenData {id:number, url:string};