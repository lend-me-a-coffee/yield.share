
import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Box, SimpleGrid, Image, Center, Text, Link } from '@chakra-ui/react';
import { useState } from "react";
import axios from 'axios';
import { serverUrl } from "../../services/serverUrl";

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
            <Text p={4} align='center'>Select a Creator to Support</Text>
            <Box p={4}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    {creators.map((creator, i) => {
                        return (
                        <>
                            <Box key={creator.id}>
                                <Center>
                                    <Image
                                        borderRadius='full'
                                        boxSize='150px'
                                        src={creator.photo}
                                        alt={creator.name}
                                    />
                                </Center>
                                <Text p={4} align='center'>{creator.name}</Text>
                                <Link href={`detailView/${creator.address}`}>View Creator</Link>
                            </Box>
                            </>
                        )
                    })}
                </SimpleGrid>
            </Box>
        </>
    );
}

export default Landing; 