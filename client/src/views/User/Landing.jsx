
import React from "react";
import Header from "../../components/Header";
import Web3Modal from "web3modal";
import { useState, useContext } from "react";
import { userContext } from "../../context/UserContext";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import {
    Button,
} from "@chakra-ui/react";
import { networkParams } from "../../config/chainConfig"
import { ethers } from "ethers";
import { providerOptions } from "../../config/providerOptions";
import { Box, SimpleGrid, Container, Image, Center, Text, HStack } from '@chakra-ui/react';

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
});

const Landing = () => {
    const { address, setAddress } = useContext(userContext);
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
            <Header optionToCreate={true}/>
            {/* <h1>Landing Page</h1> */}
            <SimpleGrid columns={{ base: 1, md: 2 }} pb={4} bgColor='#4791D1'>
                <Container maxW='lg'>
                    <Text p={6} fontSize='5xl' fontWeight='bold' color='#fff'>
                        Stake your assets, support the creator with the yield.
                        {!account ? (
                            <Button
                                mt={10}
                                bgColor='#fff'
                                color='#4791D1'
                                size='lg'
                                onClick={connectWallet}
                            >
                                Connect Wallet
                            </Button>
                        ) : (
                            <></>
                        )}
                    </Text>
                </Container>
                <Container>
                    <Button
                        mt={10}
                        bgColor='#4791D1'
                        color='#fff'
                        size='lg'
                        // onClick={}
                    >
                        View Creator
                    </Button>
                </Container>
            </SimpleGrid>

            <Box bgColor='#f3f3f3'>
                <Container
                    p={6}
                    maxW='lg'
                    color='#4791D1'
                    fontSize='4xl'
                    fontWeight='bold'
                    centerContent
                >
                    How it Works?
                </Container>
                <Container maxW='6xl' p={6}>
                    <SimpleGrid columns={{ base: 1, md: 3 }} mb={4}>
                        <Container maxW='sm' centerContent>
                            <Image
                                mb={4}
                                src='gibbresh.png' 
                                fallbackSrc='https://via.placeholder.com/140'
                                borderRadius='full'
                            />
                            <HStack fontSize='xl'>
                                {/* <Text mr={6}>1)</Text> */}
                                <Text>Connect Wallet and <Text as='u' fontWeight='semibold'>find creator to support</Text></Text>
                            </HStack>
                        </Container>
                        <Container maxW='sm' centerContent>
                            <Image
                                mb={4}
                                src='gibbresh.png' 
                                fallbackSrc='https://via.placeholder.com/140'
                                borderRadius='full'
                            />
                            <HStack fontSize='xl'>
                                <Text>
                                    Stake assets in smart contract. <Text as='u' fontWeight='bold'>Asset’s yields are sent to creator</Text>
                                    <br/><br/>
                                    <Text as='u' fontWeight='bold'>Withdrawl anytime!</Text>
                                </Text>
                            </HStack>
                        </Container>
                        <Container maxW='sm' centerContent>
                            <Image
                                mb={4}
                                src='gibbresh.png' 
                                fallbackSrc='https://via.placeholder.com/140'
                                borderRadius='full'
                            />
                            <HStack fontSize='xl'>
                                <Text>
                                    Leave a <Text as='u' fontWeight='bold'>motivational comment</Text> for your creator
                                </Text>
                            </HStack>
                        </Container>
                    </SimpleGrid>
                </Container>
            </Box>

            <Box>
                <Container
                    p={6}
                    maxW='lg'
                    fontSize='4xl'
                    fontWeight='bold'
                    centerContent
                >
                    Featured Creators
                </Container>
                <Container maxW='6xl' p={6} mb={6}>
                    <SimpleGrid columns={{ base: 1, md: 3 }} mb={4} spacing={4}>
                        <Container
                            maxW='sm'
                            border='solid 2px #f3f3f3'
                            borderRadius='lg'
                        >
                            <Box
                                pt={3}
                                maxW='lg'
                                color='#4791D1'
                                fontSize='md'
                                fontWeight='semibold'
                            >
                                ❤️ 200 Supporters
                            </Box>
                            <Center p={6}>
                                <Image
                                    borderRadius='full'
                                    boxSize='170px'
                                    src='https://bit.ly/dan-abramov'
                                    alt='Dan Abramov'
                                />
                            </Center>
                            <Box align='center' mb={4}>
                                <Text fontSize='2xl' fontWeight='bold' as='u'>Michael S.</Text>
                                <Text fontSize='md'>Is eating bears</Text>
                                <Button
                                    mt={10}
                                    bgColor='#4791D1'
                                    color='#fff'
                                    size='lg'
                                    // onClick={}
                                >
                                    View Creator
                                </Button>
                            </Box>
                        </Container>
                        <Container
                            maxW='sm'
                            border='solid 2px #f3f3f3'
                            borderRadius='lg'
                        >
                            <Box
                                pt={3}
                                maxW='lg'
                                color='#4791D1'
                                fontSize='md'
                                fontWeight='semibold'
                            >
                                ❤️ 200 Supporters
                            </Box>
                            <Center p={6}>
                                <Image
                                    borderRadius='full'
                                    boxSize='170px'
                                    src='https://bit.ly/dan-abramov'
                                    alt='Dan Abramov'
                                />
                            </Center>
                            <Box align='center' mb={4}>
                                <Text fontSize='2xl' fontWeight='bold' as='u'>Michael S.</Text>
                                <Text fontSize='md'>Is eating bears</Text>
                                <Button
                                    mt={10}
                                    bgColor='#4791D1'
                                    color='#fff'
                                    size='lg'
                                    // onClick={}
                                >
                                    View Creator
                                </Button>
                            </Box>
                        </Container>
                        <Container
                            maxW='sm'
                            border='solid 2px #f3f3f3'
                            borderRadius='lg'
                        >
                            <Box
                                pt={3}
                                maxW='lg'
                                color='#4791D1'
                                fontSize='md'
                                fontWeight='semibold'
                            >
                                ❤️ 200 Supporters
                            </Box>
                            <Center p={6}>
                                <Image
                                    borderRadius='full'
                                    boxSize='170px'
                                    src='https://bit.ly/dan-abramov'
                                    alt='Dan Abramov'
                                />
                            </Center>
                            <Box align='center' mb={4}>
                                <Text fontSize='2xl' fontWeight='bold' as='u'>Michael S.</Text>
                                <Text fontSize='md'>Is eating bears</Text>
                                <Button
                                    mt={10}
                                    bgColor='#4791D1'
                                    color='#fff'
                                    size='lg'
                                    // onClick={}
                                >
                                    View Creator
                                </Button>
                            </Box>
                        </Container>
                    </SimpleGrid>
                </Container>
            </Box>
            <Footer/>
        </>
    );
}

export default Landing; 