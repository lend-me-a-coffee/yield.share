import React from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Textarea, 
    Button
} from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react';
import Header from "../../components/Header";
import { useState } from "react";
import { userContext } from "../../context/UserContext";
import axios from 'axios';
import { useContext } from "react";
import { serverUrl } from "../../services/serverUrl";


const CreateProfile = () => {
    const [name, setName] = useState("")
    const [tagLine, setTagLine] = useState("")
    const [links, setLinks] = useState([])
    const [description, setDescription] = useState("")
    const [picUrl, setPicUrl] = useState("")
    const [chain, setChain] = useState("polygon")
    const { address, setAddress } = useContext(userContext);


    const handleSubmit = (e) => {
        try{
            axios.post(`${serverUrl}createUser`, {
                name: name,
                tagline: tagLine,
                links: [],
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
            setTagLine("")
            setLinks([])
            setDescription("")
            setPicUrl("")
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <>
        <Header optionToCreate={false}/>
            <Container maxW='3xl' centerContent>
                <Box p={4} maxW='lg' color='black' fontSize='4xl'>
                    Create Profile
                </Box>
            </Container>
            <Container p={4} maxW='4xl' centerContent bgColor='gray.100'>
                <FormControl p={4}>
                    <FormLabel htmlFor='first-name'>First name</FormLabel>
                    <Input  
                        onChange={e => setName(e.target.value)} 
                        mb={4} 
                        bgColor='white' />
                    <FormLabel htmlFor='description'>Description</FormLabel>
                    <Textarea 
                        mb={4} 
                        rows='6'
                        bgColor='white' 
                        onChange={e => setDescription(e.target.value)}
                    />
                    <FormLabel htmlFor='picUrl'>Profile Pic URL</FormLabel>
                    <Textarea 
                        mb={4} 
                        bgColor='white' 
                        onChange={e => setPicUrl(e.target.value)}
                    />
                </FormControl>
            </Container>
            <Container p={6} mb={6} maxW='3xl' centerContent>
                <Button
                    colorScheme='teal'
                    size='lg'
                    borderRadius='full'
                    onClick={handleSubmit}
                >Create Profile
                </Button>
            </Container>
        </>
    )
}

export default CreateProfile;