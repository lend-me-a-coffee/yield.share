
import React from "react";
import Header from "../../components/Header";
import Web3Modal from "web3modal";
import { providerOptions } from "../../config/providerOptions";
import { Box, SimpleGrid, Image, Center, Text } from '@chakra-ui/react';
import { useState, useContext } from "react";
import { userContext } from "../../context/UserContext";

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
});

const Landing = () => {
    const { address, setAddress } = useContext(userContext);
    return (
        <>
        <Header optionToCreate={true}/>
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