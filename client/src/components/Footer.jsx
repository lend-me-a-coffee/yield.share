import { React } from 'react';
import { Box, Container, Image, Center, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <>
        <Box bgColor='#4791D1' p={6} align='center'>
            <Center>
                <Image
                    mb={4}
                    src='footer-logo.svg'
                    fallbackSrc='footer-logo.svg'
                    borderRadius='full'
                />
            </Center>
            <Text color='#fff'>
                2022 Made at️ #ETHNewYork
                <br/>
                by: @weichuliao @paigexx @iamcryptoboi @Bullrich @mondo
            </Text>
        </Box>
        </>
    );
}

export default Footer;