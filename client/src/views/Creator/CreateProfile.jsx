import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { serverUrl } from "../../services/serverUrl";
import { useState, useContext } from "react";
import { userContext } from "../../context/UserContext";
import axios from 'axios';
import {
    FormControl,
    FormLabel,
    Input,
    Textarea, 
    Button, 
    Box, 
    Container, 
    Select, 
    Image, 
    SimpleGrid
} from '@chakra-ui/react'
import {useWallet} from "../../context/Wallet";
import {Chains, changeNetwork} from "../../blockchain/networks";
import {deploy} from "../../deploy";
import {useNavigate} from "react-router-dom";



const CreateProfile = () => {
    const wallet = useWallet();
    const navigate = useNavigate();
    const defaultChain = "optimism";
    const [name, setName] = useState("")
    const [tagline, setTagline] = useState("")
    const [twitter, setTwitter] = useState()
    const [facebook, setFb] = useState()
    const [instagram, setIg] = useState()
    const [description, setDescription] = useState("")
    const [picUrl, setPicUrl] = useState("")
    const [chain, setChain] = useState(defaultChain);
    const { address, setAddress } = useContext(userContext);

    const switchNetwork = async (network) => {
        let chainToSwitch;
        switch (network){
            case "optimism":
                chainToSwitch = Chains.OPTIMISM;
                break;
            case "polygon":
                chainToSwitch = Chains.POLYGON;
                break;
            case "boba":
                chainToSwitch = Chains.BOBA;
                break;
            case "cronos":
                chainToSwitch = Chains.CRONOS;
                break;
            case "skale":
                chainToSwitch = Chains.SKALE;
                break;
            default:
                throw new Error(`${network} not supported`);
        }
        console.log("switching to", chainToSwitch);
        await changeNetwork(chainToSwitch);
        setChain(network);
    }


    const handleSubmit = async (e) => {
        try{
            const contractAddress = "0x4a704da40706249a2ac1c469F2asdasdasd";
            // const contractAddress = await deploy(wallet.provider);

            const userData = {
                name,
                tagline: tagline,
                links: [twitter, facebook, instagram],
                address: contractAddress,
                description: description,
                photo: picUrl,
                chain: chain
            };

            await axios.post(`${serverUrl}createUser`, userData)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
            setTagline("")
            setDescription("")
            setPicUrl("")
            navigate(`../detailView/${contractAddress}`);
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <Header optionToCreate={false}/>
            <Container maxW='3xl' centerContent>
                <Box m={4} p={4} maxW='lg' color='black' fontSize='4xl' fontWeight='bold'>
                    Setup Creator Profile
                </Box>
            </Container>

            {/* Creators Form */}
            <Container mb={4} maxW='3xl' centerContent bgColor='#f3f3f3' border='solid 1px #ccc'>
                <FormControl p={6}>
                    <FormLabel htmlFor='first-name' fontWeight='semibold'>Set Creator Username</FormLabel>
                    <Input mb={4} id='first-name' placeholder='Vitalik Buterin' bgColor='white' onChange={e => setName(e.target.value)} />

                    <FormLabel htmlFor='tagline' fontWeight='semibold'>Set Creator Tagline</FormLabel>
                    <Input onChange={e => setTagline(e.target.value)} mb={4} id='tagline' placeholder='Is saving kittens' bgColor='white' />

                    <FormLabel htmlFor='first-name' fontWeight='semibold'>Set Creator Description</FormLabel>
                    <Textarea mb={4} rows='4' placeholder='I also do other things, I just like saving kittens and it is really important to me. Join me in my quest to save the kittens.' bgColor='white' onChange={e => setDescription(e.target.value)} />

                    <FormLabel htmlFor='first-name' fontWeight='semibold'>Select on Which Chain Users can Stake</FormLabel>
                    <Select mb={4} placeholder='Select Chain' bgColor='#fff' onChange={e => switchNetwork(e.target.value)}>
                        <option value='polygon'>Polygon</option>
                        <option value='optimism'>Optimism</option>
                        <option value='boba'>Boba</option>
                        <option value='cronos'>Cronos</option>
                        <option value='skale' disabled>Skale</option>
                    </Select>

                    <FormLabel htmlFor='first-name' fontWeight='semibold'>Set Profile Pic URL</FormLabel>
                    <Input mb={4} id='first-name' placeholder='https://yahoo.com/vitalik.jpg' bgColor='white' onChange={e => setPicUrl(e.target.value)} />

                    <SimpleGrid columns={{ base: 1, md: 2 }}>
                        <Box mr={2}>
                            <Box mb={2} fontWeight='semibold'>Twitter URL</Box>
                            <Input mb={4} id='first-name' placeholder='twitter.com/vitalik' bgColor='white' onChange={e => setTwitter(e.target.value)} />
                        </Box>
                        <Box>
                            <Box mb={2} fontWeight='semibold'>Facebook URL</Box>
                            <Input mb={4} id='first-name' placeholder='facebook.com/vitalik' bgColor='white' onChange={e => setFb(e.target.value)}  />
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 2 }}>
                        <Box mr={2}>
                            <Box mb={2} fontWeight='semibold'>Instagram URL</Box>
                            <Input mb={4} id='first-name' placeholder='instagram.com/vitalik' bgColor='white' onChange={e => setIg(e.target.value)} />
                        </Box>
                    </SimpleGrid>
                </FormControl>
                <Button
                    mb={4}
                    bgColor='#4791D1'
                    color='#fff'
                    size='lg'
                    borderRadius='md'
                    onClick={handleSubmit}
                >
                    Create Profile
                </Button>
            </Container>
            <Container
                p={6} mb={6}
                maxW='xl'
                centerContent
            >
                <Box  display='flex' alignItems='center'>
                    <Image
                        mr={4}
                        borderRadius='full'
                        boxSize='80px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Box
                        pl={4}
                        minW='md'
                        color='black'
                        fontSize='sm'
                    >
                        Confirming Create Profile creates a transaction on the blockchain, which may take a moment to confirm.
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default CreateProfile;