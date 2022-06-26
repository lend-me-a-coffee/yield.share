import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../services/serverUrl";
import {
    Box, 
    Container,
    Image, 
    Button, 
    CloseButton, 
    Flex, 
    Text, 
    Spacer, 
    HStack, 
    SimpleGrid, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Modal,
    ModalBody,
    ModalCloseButton,
    NumberInput,
    NumberInputField,
    useDisclosure, 
    RadioGroup, 
    Radio, 
    Textarea
} from '@chakra-ui/react'



const DetailedView = () => {
    const [value, setValue] = React.useState('1')
    const [creator, setCreator] = useState({})
    let {address} = useParams()
    const { isOpen: isSupportOpen, onOpen: onSupportOpen, onClose: onSupportClose } = useDisclosure()
    const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure()

    useEffect(() => {
        try {
            axios.get(`${serverUrl}creator?address=${address}`)
            .then((response) => {
                console.log(response.data);
                setCreator(response.data)
            });
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    return (
        <>
        {console.log(JSON.stringify(creator))}
            <Header optionToCreate={true}/>
            <Container
                    bgColor='#fff'
                    maxW='3xl'
                    centerContent
                    borderRadius='md'
                    // border="solid 1px #ccc"
                >
                    <Box pt={6} maxW='lg'>
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
            <Box p={4} mb={4} bgColor='#4791D1'>
                <Container maxW='3xl' centerContent>
                    <Box p={4} maxW='lg' color='black'>
                        {creator.description} 
                    </Box>
                    <Box
                        p={2}
                        maxW='lg'
                        color='black'
                        fontSize='4xl'
                        fontWeight='bold'
                    >
                        {creator.name}
                    </Box>
                    <Box
                        mb={4}
                        maxW='lg'
                        color='black'
                        fontSize='2xl'
                    >
                        {creator.tagline}
                    </Box>
                    <Box
                        maxW='lg'
                        bgcolor='#4791D1'
                        fontSize='md'
                        color='#fff'
                        fontWeight='semibold'
                    >
                        ❤️ 200 Supporters
                    </Box>
                    <Box
                        p={6} 
                        maxW='xl' 
                        color='black'
                        fontSize='lg'
                    >
                        {creator.description}
                    </Box>
                    <Button
                        mb={6}
                        color='#fff'
                        bgColor='#4791D1'
                        size='lg'
                        borderRadius='md'
                        onClick={onSupportOpen}
                    >
                        Support {creator.name}
                    </Button>
                </Container>
            </Box>


            <Container maxW='4xl'>
                <Flex alignItems='center'>
                    <Box
                        p={4}
                        maxW='lg'
                        fontSize='lg'
                        fontWeight='bold'
                    >
                        Your Support for {creator.name}
                    </Box>
                    <Spacer/>
                    <Box
                        align='center'
                        maxW='sm'
                        fontSize='sm'
                    >
                        Remove Support<br/>for Creator
                    </Box>
                </Flex>
            </Container>
            <Container
                p={4} mb={4} 
                maxW='4xl' 
                centerContent
                border='solid 1px #ccc'
                borderRadius='lg'
            >
                
                <Box p={4} display='flex' alignItems='center'>
                    <Image
                        mr={4}
                        borderRadius='full'
                        boxSize='100px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Box>
                        <Flex>
                            <HStack>
                                <Box
                                    pl={4}
                                    color='black'
                                    fontSize='lg'
                                    fontWeight='bold'
                                >
                                    0x14209
                                </Box>
                                <Box>・Has shared Yield</Box>
                            </HStack>
                            <Spacer/>
                            <CloseButton
                                border='solid 1px #FE0000'
                                borderRadius='full'
                                color='#FE0000'
                                bgColor='#f3f3f3'
                                onClick={onRemoveOpen}
                            />
                        </Flex>
                        <Box
                            p={4} 
                            minW='2xl' 
                            maxW='2xl' 
                            color='black'
                            fontSize='lg'
                        >
                            “Hey man, forget the kittens... You’re needed elsewhere!”
                        </Box>
                    </Box>
                </Box>
            </Container>


            <Container maxW='4xl'>
                <Box
                    p={4}
                    maxW='lg'
                    fontSize='lg'
                    fontWeight='bold'
                >
                    {creator.name}’s Recent Supporters
                </Box>
            </Container>
            <Container
                p={4}
                maxW='4xl' 
                centerContent
                border='solid 1px #ccc'
                borderRadius='lg'
            >
                <Box p={4} display='flex' alignItems='center'>
                    <Image
                        mr={4}
                        borderRadius='full'
                        boxSize='100px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Box>
                        <HStack>
                            <Box
                                pl={4}
                                color='black'
                                fontSize='lg'
                                fontWeight='bold'
                            >
                                0x13337
                            </Box>
                            <Box>・Has shared Yield</Box>
                        </HStack>
                        <Box
                            p={4} 
                            minW='2xl' 
                            maxW='2xl' 
                            color='black'
                            fontSize='lg'
                        >
                            “Hey there, keep up the good work with the Kittens."
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Container
                p={4}
                maxW='4xl' 
                centerContent
                border='solid 1px #ccc'
                borderRadius='lg'
            >
                <Box p={4} display='flex' alignItems='center'>
                    <Image
                        mr={4}
                        borderRadius='full'
                        boxSize='100px'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Box>
                        <HStack>
                            <Box
                                pl={4}
                                color='black'
                                fontSize='lg'
                                fontWeight='bold'
                            >
                                0x12342
                            </Box>
                            <Box>・Has shared Yield</Box>
                        </HStack>
                        <Box
                            p={4} 
                            minW='2xl' 
                            maxW='2xl' 
                            color='black'
                            fontSize='lg'
                        >
                            “Hey man, forget the kittens... You’re needed elsewhere!”
                        </Box>
                    </Box>
                </Box>
            </Container>
            
            <Modal
                isOpen={isSupportOpen} 
                onClose={onSupportClose}
                isCentered
                closeOnOverlayClick={false}
                size='3xl'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        align='center'
                        fontSize='xl'
                        fontWeight='bold'
                    >
                        Select staking amount and duration
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={6}>
                        <Box
                            bgColor='#f3f3f3'
                            mr={6} ml={6} p={10}
                        >
                            <SimpleGrid columns={{ base: 1, md: 2 }} mb={4}>
                                <Box>
                                    <Box mb={2} fontWeight='semibold'>Select Amount</Box>
                                    <NumberInput
                                        mr={2}
                                        defaultValue={1}
                                        min={0}
                                    >
                                        <NumberInputField placeholder='Amount' bgColor='#fff' />
                                    </NumberInput>
                                </Box>
                                <Box>
                                    <Box mb={2} fontWeight='semibold'>Select Asset</Box>
                                    <Box
                                        p={2} 
                                        color='#000' 
                                        borderRadius='md' 
                                        border='solid 1px #ccc'
                                        align='center'
                                        fontWeight='semibold'
                                    >
                                        Ethereum
                                    </Box>
                                </Box>
                            </SimpleGrid>

                            <Box mb={2} fontWeight='semibold'>Set Staking Duration</Box>
                            <Box
                                p={6} mb={4}
                                bgColor='#fff'
                                border='solid 1px #e2e8f0'
                                borderRadius='md'
                            >
                                <RadioGroup
                                    onChange={setValue} 
                                    value={value}
                                >
                                    <Flex>
                                        <Radio value='1'>1 month</Radio>
                                        <Spacer />
                                        <Radio value='2'>3 months</Radio>
                                        <Spacer />
                                        <Radio value='3'>6 months</Radio>
                                    </Flex>
                                </RadioGroup>
                            </Box>
                            
                            <Box mb={2} fontWeight='semibold'>Add Support Comment</Box>
                            <Textarea
                                mb={4}
                                placeholder="Keep up the good work! We're rooting for you!"
                                bgColor='#fff'
                            />

                            <Box align='center'>
                                <Button
                                    onClick={onSupportClose}
                                    borderRadius='md'
                                    size='lg'
                                    bgColor='#4791D1'
                                    color='#fff'
                                >
                                    Confirm Staking Assets
                                </Button>
                            </Box>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Container mb={4} maxW='xl' centerContent>
                            <Box display='flex' alignItems='center'>
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
                                    Interest Yield will be automatically be paid out to the creator upon staking assets.
                                    <br/><br/>
                                    Assets can be removed at any time.
                                </Box>
                            </Box>
                        </Container>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isRemoveOpen}
                onClose={onRemoveClose}
                isCentered
                closeOnOverlayClick={false}
                size='3xl'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        align='center'
                        fontSize='xl'
                        fontWeight='bold'
                    >
                        Remove Support for Creator?
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={6}>
                        <Box
                            bgColor='#f3f3f3'
                            mr={6} ml={6} p={10}
                        >
                            <Flex mb={6} alignItems='center'>
                                <Image
                                    mr={4}
                                    borderRadius='full'
                                    boxSize='20px'
                                    src='https://via.placeholder.com/20'
                                    alt='Dan Abramov'
                                />
                                <Box pl={4} minW='sm' color='black' fontSize='sm'>
                                    When you remove support for the creator, they no longer will recieve any interest from your yield. 
                                </Box>
                            </Flex>
                            <Flex mb={6} alignItems='center'>
                                <Image
                                    mr={4}
                                    borderRadius='full'
                                    boxSize='20px'
                                    src='https://via.placeholder.com/20'
                                    alt='Dan Abramov'
                                />
                                <Box pl={4} minW='sm' color='black' fontSize='sm'>
                                    Your comment will be removed from the creator’s profile.
                                </Box>
                            </Flex>
                            <Flex mb={6} alignItems='center'>
                                <Image
                                    mr={4}
                                    borderRadius='full'
                                    boxSize='20px'
                                    src='https://via.placeholder.com/20'
                                    alt='Dan Abramov'
                                />
                                <Box pl={4} minW='sm' color='black' fontSize='sm'>
                                    <Text as='u' fontWeight='bold'>All your staked assets will be returned (from this creator)</Text>
                                </Box>
                            </Flex>
                            <Box align='center'>
                                <Button
                                    onClick={onRemoveClose}
                                    borderRadius='md'
                                    size='lg'
                                    bgColor='#4791D1'
                                    color='#fff'
                                >
                                    Remove Creator Support
                                </Button>
                            </Box>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Container mb={4} maxW='xl' centerContent>
                            <Box display='flex' alignItems='center'>
                                <Image
                                    mr={4}
                                    borderRadius='full'
                                    boxSize='80px'
                                    src='https://via.placeholder.com/100'
                                    alt='Dan Abramov'
                                />
                                <Box
                                    pl={4}
                                    minW='sm'
                                    color='black'
                                    fontSize='sm'
                                >
                                    Removing Creator Support cannot be reversed.
                                </Box>
                            </Box>
                        </Container>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box h='80px'></Box>
            <Footer/>
        </>
    )
}
export default DetailedView