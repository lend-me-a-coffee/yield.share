
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
import { Box, SimpleGrid, Image, Center, Text } from '@chakra-ui/react';

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
            {/* <h1>Landing Page</h1> */}
            {/* <Center> */}
                {/* <Image src='gibbresh.png' fallbackSrc='https://via.placeholder.com/150' /> */}
            {/* </Center> */}
            <Box mb={10} bg='grey' height='250px'>
                {!account ? (
                    <Center>
                        <Button onClick={connectWallet}>Connect Wallet</Button>
                    </Center>
                ) : (
                    <>
                    <Button onClick={disconnect}>Disconnect</Button>
                    <p>Chain ID: {chainId}</p>
                    <p>Address: {account}</p>
                    </>
                )}
            </Box>

            <Text p={4} align='center'>Select a Creator to Support</Text>
            <Box p={4}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Box>
                        <Center>
                            <Image
                                borderRadius='full'
                                boxSize='150px'
                                src='https://bit.ly/dan-abramov'
                                alt='Dan Abramov'
                            />
                        </Center>
                        <Text p={4} align='center'>Person A</Text>
                    </Box>
                    <Box>
                        <Center>
                            <Image
                                borderRadius='full'
                                boxSize='150px'
                                src='https://bit.ly/dan-abramov'
                                alt='Dan Abramov'
                            />
                        </Center>
                        <Text p={4} align='center'>Best Food Creator</Text>
                    </Box>
                    <Box>
                        <Center>
                            <Image
                                borderRadius='full'
                                boxSize='150px'
                                src='https://bit.ly/dan-abramov'
                                alt='Dan Abramov'
                            />
                        </Center>
                        <Text p={4} align='center'>Person C</Text>
                    </Box>
                </SimpleGrid>
            </Box>
        </>
    );
}

export default Landing; 