import {useContext} from "react";
import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Link,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
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
        <Box px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>
                    {/* <Box Link>Logo</Box> */}
                    <NavLink to="/">
                        <Image
                            mb={4}
                            src='../logo-navbar.svg'
                            fallbackSrc='../logo-navbar.svg'
                            borderRadius='full'
                            id='navbar-logo '
                            style={{marginBottom: "0", marginTop: "0"}}
                        />
                    </NavLink>
                </HStack>
                <Flex alignItems={'center'}>
                    {optionToCreate && address ?  
                    <Button bgColor={'transparent'} color={'#4791D1'} variant='solid' spacing={4}>
                        <NavLink to="/createProfile">
                            Create Profile
                        </NavLink>
                    </Button>
                    :
                    null}
                    <LoginBttn/>
                </Flex>
            </Flex>
        </Box>
        </>
    );
}

export default Header;