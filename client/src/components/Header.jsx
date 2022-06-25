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
import { useState } from 'react';

const Header = (props) => {
    const [isLogggedIn, setIsLogggedIn] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const {optionToCreate} = props;


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
                </HStack>
                <Flex alignItems={'center'}>
                    {optionToCreate ?  
                    <Button colorScheme='teal' variant='solid' spacing={4}><Link href="/createProfile" >Create Profile</Link></Button>
                    :
                    null}
                    <Button onClick={toggleColorMode}  size={'sm'} variant='ghost'>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Flex>
            </Flex>
        </Box>
        </>
    );
}

export default Header;