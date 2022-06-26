import {useContext} from "react";
import {Box, Button, Flex, HStack, IconButton, useColorMode, useColorModeValue, useDisclosure,} from "@chakra-ui/react";
import {CloseIcon, HamburgerIcon, MoonIcon, SunIcon} from "@chakra-ui/icons";
import LoginBttn from "./LoginBttn"
import {userContext} from "../context/UserContext";
import {NavLink} from "react-router-dom";


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
                    <NavLink to="/">
                        Home
                    </NavLink>
                </HStack>
                <Flex alignItems={'center'}>
                    {optionToCreate && address ?  
                    <Button colorScheme='teal' variant='solid' spacing={4}>
                        <NavLink to="/createProfile">
                            Create Profile
                        </NavLink>
                    </Button>
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