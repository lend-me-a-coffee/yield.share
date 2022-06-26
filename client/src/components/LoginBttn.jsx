import {useContext, useEffect, useState} from "react";
import {Button,} from "@chakra-ui/react";
import {ethers} from "ethers";
import {providerOptions} from "../config/providerOptions";
import Web3Modal from "web3modal";
import {userContext} from "../context/UserContext";
import {useWallet} from "../context/Wallet";


const LoginBttn = () => {
    const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required
    });

    const wallet = useWallet();

    const {address, setAddress} = useContext(userContext);
    const [chainId, setChainId] = useState("")


    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(provider, "any");
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            if (accounts) setAddress(accounts[0]);
            setChainId(network.chainId);

            wallet.setAddress(accounts[0], library.getSigner());
        } catch (error) {
            console.log(error);
        }
    };


    const disconnect = async () => {
        await web3Modal.clearCachedProvider();
        refreshState();
    };


    const refreshState = () => {
        setAddress("");
        setChainId("");
    };


    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);


    return (
        <>
            {!address ? (
                <Button variant={"ghost"} onClick={connectWallet}>Connect Wallet</Button>
            ) : (
                <Button variant={"ghost"} onClick={disconnect}>Disconnect</Button>
            )}
        </>
    )
}

export default LoginBttn;