import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../../services/serverUrl";
import { userContext } from "../../context/UserContext";
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
import {StakeModal} from "./StakeModal";



const DetailedView = () => {
    const [creator, setCreator] = useState({})
    const { address, setAddress } = useContext(userContext);
    let {userAddress} = useParams()
    const { isOpen: isSupportOpen, onOpen: onSupportOpen, onClose: onSupportClose } = useDisclosure()
    const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveClose } = useDisclosure()
    const [userComments, setUserComments] = useState([])
    const [otherComments, setOtherComments] = useState([])

    useEffect(() => {
        try {
            axios.get(`${serverUrl}creator?address=${userAddress}`)
            .then((response) => {
                setCreator(response.data)
                response.data.comments.filter((comment)=>{
                    // seperate curent user and other users NFTS
                    if(comment.author!=address && !userComments.includes(comment)){
                        setUserComments([...userComments, comment])
                    }

                        setOtherComments([...otherComments, comment])
                    })
            });
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    return (
        <>
        {console.log(userComments)}
        {console.log(otherComments)}
            <Header optionToCreate={true}/>

            <Box p={4} mb={4} bgColor='#4791D1'>
                <Container
                    bgColor='#fff'
                    maxW='3xl'
                    centerContent
                    borderRadius='md'
                    border="solid 1px #ccc"
                >
                    <Box pt={6} maxW='lg'>
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src={creator.photo}
                            alt={creator.name}
                        />
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
                        fontSize='md'
                        color='#4791D1'
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
                            isDisabled={ address ? false : true}
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
                {/* Users Comment for Creator  */}
                {userComments.map(comment => {
                    return (
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
                                        {comment.author}
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
                                {comment.text}
                            </Box>
                            <Box
                                p={4} 
                                minW='2xl' 
                                maxW='2xl' 
                                color='black'
                                fontSize='lg'
                            >
                                Duration: {comment.duration} months
                            </Box>
                        </Box>
                    </Box>
                    )
                })
                } 
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

            {/* Other Supporting Users for Creator */}
            <Container
                p={4}
                maxW='4xl' 
                centerContent
                border='solid 1px #ccc'
                borderRadius='lg'
            >
                {otherComments.map((comment) => {return (
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
                                {comment.author}
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
                            {comment.text}
                        </Box>
                        <Box
                                p={4} 
                                minW='2xl' 
                                maxW='2xl' 
                                color='black'
                                fontSize='lg'
                            >
                                Duration: {comment.duration} months
                            </Box>
                        </Box>
                    </Box>
                )})}
                
            </Container>

                        
            {/* Staking Modal  */}
            
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
                        <StakeModal onSupportClose={onSupportClose} contractAddress={userAddress}/>
                    </ModalBody>
                    <ModalFooter>
                        <Container mb={4} maxW='xl' centerContent>
                            <Box display='flex' alignItems='center'>
                                <Image
                                    mr={4}
                                    borderRadius='full'
                                    boxSize='80px'
                                    src='caution-icon.svg'
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


            {/* Remove Stake Modal */}

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
                                    src='caution-icon.svg'
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