import {createContext, useContext, useState} from "react";

const WalletContext = createContext({
    setAddress: (address, provider) => {
    }, provider: null, address: ""
});

export const useWallet = () => useContext((WalletContext));

export const WalletProvider = (props) => {
    const setWalletContext = (address, provider) => {
        setWallet({...wallet, address, provider})
    }
    const [wallet, setWallet] = useState({setAddress: setWalletContext});

    return <WalletContext.Provider value={wallet}>
        {props.children}
    </WalletContext.Provider>
}