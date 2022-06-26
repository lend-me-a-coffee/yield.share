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



const CreateProfile = () => {
    const [insta, setInsta] = useState("")
    const [twitter, setTwitter] = useState("")
    const [facebook, setFacebook] = useState("")    
    const [name, setName] = useState("")
    const [tagline, setTagline] = useState("")
    const [links, setLinks] = useState([])
    const [description, setDescription] = useState("")
    const [picUrl, setPicUrl] = useState("")
    const [chain, setChain] = useState("")
    const { address, setAddress } = useContext(userContext);

    const addLinks = () => {
        setLinks([twitter, facebook, insta])
    }

    const handleSubmit = (e) => {
        addLinks()
        try{
            axios.post(`${serverUrl}createUser`, {
                name: name,
                tagline: tagline,
                links: links,
                address: address,
                description: description,
                photo: picUrl,
                chain: chain
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
            setName("")
            setTagline("")
            setLinks([])
            setDescription("")
            setPicUrl("")
            setChain("")
            setInsta("")
            setTwitter("")
            setFacebook("")
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
                    <FormLabel htmlFor='name' fontWeight='semibold'>Set Creator Username</FormLabel>
                    <Input mb={4} id='name' placeholder='Vitalik Buterin' bgColor='white' onChange={e => setName(e.target.value)} />

                    <FormLabel htmlFor='tagline' fontWeight='semibold'>Set Creator Tagline</FormLabel>
                    <Input onChange={e => setTagline(e.target.value)} mb={4} id='tagline' placeholder='Is saving kittens' bgColor='white' />

                    <FormLabel htmlFor='description' fontWeight='semibold'>Set Creator Description</FormLabel>
                    <Textarea mb={4} rows='4' placeholder='I also do other things, I just like saving kittens and it is really important to me. Join me in my quest to save the kittens.' bgColor='white' onChange={e => setDescription(e.target.value)} />

                    <FormLabel htmlFor='chain' fontWeight='semibold'>Select Chain</FormLabel>
                    <Select onChange={e => setChain(e.target.value)} mb={4} placeholder='Select Chain' bgColor='#fff'>
                        <option value='polygon'>Polygon</option>
                        <option value='optimism'>Optimism</option>
                    </Select>

                    <FormLabel htmlFor='picUrl' fontWeight='semibold'>Set Profile Pic URL</FormLabel>
                    <Input mb={4} id='picUrl' placeholder='https://yahoo.com/vitalik.jpg' bgColor='white' onChange={e => setPicUrl(e.target.value)} />

                    <SimpleGrid columns={{ base: 1, md: 2 }}>
                        <Box mr={2}>
                            <Box mb={2} fontWeight='semibold'>Twitter URL</Box>
                            <Input  onChange={e => setTwitter(e.target.value)} mb={4} id='twitter' placeholder='twitter.com/vitalik' bgColor='white' />
                        </Box>
                        <Box>
                            <Box mb={2} fontWeight='semibold'>Facebook URL</Box>
                            <Input  onChange={e => setFacebook(e.target.value)} mb={4} id='facebook' placeholder='facebook.com/vitalik' bgColor='white' />
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 2 }}>
                        <Box mr={2}>
                            <Box mb={2} fontWeight='semibold'>Instagram URL</Box>
                            <Input  onChange={e => setInsta(e.target.value)} mb={4} id='insta' placeholder='instagram.com/vitalik' bgColor='white' />
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