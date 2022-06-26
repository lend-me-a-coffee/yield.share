// detailed view of selected creator profile
import React from "react";
import Header from "../../components/Header";

import { Box, Container, Image, Button, Flex, Text, Spacer } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { serverUrl } from "../../services/serverUrl";

const DetailedView = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = React.useState('1')
    const [creator, setCreator] = useState({})
    let {address} = useParams()

    useEffect(() => {
        try {
            axios.get(`${serverUrl}creator?address=${address}`)
            .then((response) => {
                console.log(response.data);
                setCreator(response.data)
            });
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
        {console.log(creator)}
            <Header optionToCreate={true}/>
            <Box p={4}>
                <Container maxW='3xl' centerContent>
                    <Box p={4} maxW='lg'>
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src={creator.photo}
                            alt={creator.name}
                        />
                    </Box>
                </Container>
                <Container maxW='3xl' centerContent>
                    <Box p={4} maxW='lg' color='black' fontSize='4xl'>
                        {creator.tagline}
                    </Box>
                </Container>
                <Container maxW='3xl' centerContent>
                    <Box p={4} maxW='lg' color='black'>
                        {creator.description}
                    </Box>
                </Container>
                <Container p={6} mb={6} maxW='3xl' centerContent>
                    <Button
                        colorScheme='teal'
                        size='lg'
                        borderRadius='full'
                        onClick={onOpen}
                    >
                        Support Creator
                    </Button>
                </Container>
                <Container p={6} mb={4} maxW='5xl' bgColor='gray.300' centerContent>
                    <Box p={4} maxW='lg' fontSize='4xl'>
                        My Comment
                    </Box>
                    <Box p={4} display='flex' alignItems='center'>
                        <Image
                            mr={4}
                            borderRadius='full'
                            boxSize='150px'
                            src='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                        />
                        <Box p={4} maxW='2xl' color='black'>
                            I create the best food. and I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food.
                        </Box>
                    </Box>
                </Container>
                <Container p={6} maxW='5xl' bgColor='gray.300' centerContent>
                    <Box p={4} maxW='lg' fontSize='4xl'>
                        Comments
                    </Box>
                    <Box p={4} display='flex' alignItems='center'>
                        <Image
                            mr={4}
                            borderRadius='full'
                            boxSize='150px'
                            src='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                        />
                        <Box p={4} maxW='2xl' color='black'>
                            I create the best food. and I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food.
                        </Box>
                    </Box>
                    <Box p={4} display='flex' alignItems='center'>
                        <Image
                            mr={4}
                            borderRadius='full'
                            boxSize='150px'
                            src='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                        />
                        <Box p={4} maxW='2xl' color='black'>
                            I create the best food. and I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food.
                        </Box>
                    </Box>
                    <Box p={4} display='flex' alignItems='center'>
                        <Image
                            mr={4}
                            borderRadius='full'
                            boxSize='150px'
                            src='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                        />
                        <Box p={4} maxW='2xl' color='black'>
                            I create the best food. and I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food. I create the best food.
                        </Box>
                    </Box>
                </Container>
            </Box>
            
            <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Support Creator</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box align='center' mb={4}>Select staking amount</Box>
                        <Flex>
                            <NumberInput defaultValue={1} min={0} mr={1} mb={4}>
                                <NumberInputField />
                                {/* <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper> */}
                            </NumberInput>
                            <Select placeholder='Select option'>
                                <option value='option1'>Ethereum (Polygon)</option>
                                <option value='option2'>Option 2</option>
                            </Select>
                        </Flex>
                        <Box align='center' mb={4}>Set staking duration</Box>
                        <RadioGroup onChange={setValue} value={value} mb={4}>
                            <Flex>
                                <Radio value='1'>1 month</Radio>
                                <Spacer />
                                <Radio value='2'>3 months</Radio>
                                <Spacer />
                                <Radio value='3'>6 months</Radio>
                            </Flex>
                        </RadioGroup>
                        <Textarea placeholder='Add Comment (Optional)' />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='teal'
                            onClick={onClose}
                            borderRadius='full'
                        >
                            Support Creator
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default DetailedView