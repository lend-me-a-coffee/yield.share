import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Box, SimpleGrid, Image, Center, Text, Link, Container, Button, HStack } from '@chakra-ui/react';
import { useState } from "react";
import axios from 'axios';
import { serverUrl } from "../../services/serverUrl";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";


const Landing = () => {
    const [creators, setCreators] = useState([])

    useEffect(() => {
        try {
            axios.get(`${serverUrl}listCreators`)
            .then((response) => {
                console.log(response.data);
                setCreators(response.data)
            });
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>  
            <Header optionToCreate={true}/>
            <SimpleGrid columns={{ base: 1, md: 2 }} pb={4} bgColor='#4791D1'>
                <Container maxW='lg'>
                    <Text p={6} fontSize='5xl' fontWeight='bold' color='#fff'>
                        Stake your assets, support the creator with the yield.
                    </Text>
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
                        {creators.map((creator, i) => {
                            return (
                                <Container
                                maxW='sm'
                                border='solid 2px #f3f3f3'
                                borderRadius='lg'
                                id={i}
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
                                        src={creator.photo}
                                        alt={creator.name}
                                    />
                                </Center>
                                <Box align='center' mb={4}>
                                    <Text fontSize='2xl' fontWeight='bold' as='u'>{creator.name}</Text>
                                    <Text fontSize='md'>{creator.tagline}</Text>
                                    <Button
                                        mt={10}
                                        bgColor='#4791D1'
                                        color='#fff'
                                        size='lg'
                                    >
                                        <NavLink to={`/detailView/${creator.address}`}>
                                            <Link>View Creator</Link>
                                        </NavLink>
                                    </Button>
                                </Box>
                            </Container>
                            )
                        })}
                    </SimpleGrid>
                </Container>
            </Box>
            <Footer/>
        </>
    );
}

export default Landing; 