
import React from "react";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
    Button,
} from "@chakra-ui/react";
import { networkParams } from "../../config/chainConfig"
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../../config/providerOptions";


const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
});

const Landing = () => {
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [chainId, setChainId] = useState();
    const [network, setNetwork] = useState();
    const [error, setError] = useState();

    const connectWallet = async () => {
    try {
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const accounts = await library.listAccounts();
        const network = await library.getNetwork();
        setProvider(provider);
        setLibrary(library);
        if (accounts) setAccount(accounts[0]);
        setChainId(network.chainId);
    } catch (error) {
        setError(error);
        }
    };
        

    const disconnect = async () => {
            await web3Modal.clearCachedProvider();
            refreshState();
    };

    const refreshState = () => {
        setAccount();
        setChainId();
        setNetwork("");
    };
        
    useEffect(() => {
        if (web3Modal.cachedProvider) {
        connectWallet();
        }
    }, []);


    return (
        <>
        <Header/>
            {!account ? (
                <Button onClick={connectWallet}>Connect Wallet</Button>
            ) : (
                <>
                <Button onClick={disconnect}>Disconnect</Button>
                <p>Chain ID: {chainId}</p>
                <p>Address: {account}</p>
                </>
            )}
        </>
    );
}

export default Landing; 