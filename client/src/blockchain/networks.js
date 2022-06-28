import {ethers} from "ethers";

export const Chains = {
    POLYGON: 80001,
    OPTIMISM: 10,
    CRONOS: 338,
    BOBA: 28,
    SKALE: 344435,
    RINKEBY: 4,
    ROPSTEN: 3
}

export const changeNetwork = async (chain) => {
    return new Promise((res, rej) => {
        window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{chainId: ethers.utils.hexValue(chain)}],
        }).then(res())
            .catch(e => rej(e));
    });
};

