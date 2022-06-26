import { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useState, useContext } from 'react';
import LoginBttn from "./LoginBttn"
import { userContext } from "../context/UserContext";


const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const {optionToCreate, account} = props;
    const { address, setAddress } = useContext(userContext);


    return (
        <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box Link>Logo</Box>
                    <HStack
                    as={'nav'}
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                    </HStack>
                    <Link href="/">Home</Link>
                </HStack>
                <Flex alignItems={'center'}>
                    {optionToCreate && address ?  
                    <Button colorScheme='teal' variant='solid' spacing={4}><Link href="/createProfile" >Create Profile</Link></Button>
                    :
                    null}
                    <LoginBttn/>
                    <Button onClick={toggleColorMode}  size={'sm'} variant='link'>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Flex>
            </Flex>
        </Box>
        </>
    );
}

export default Header;