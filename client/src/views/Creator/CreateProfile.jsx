import React from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea
} from '@chakra-ui/react'
import { Box, Container, Image, Button, Flex, Text, Spacer } from '@chakra-ui/react';

const CreateProfile = () => {
    return (
        <>
            <h1>Create Creator Profile</h1>
            <Container maxW='3xl' centerContent>
                <Box p={4} maxW='lg' color='black' fontSize='4xl'>
                    Create Profile
                </Box>
            </Container>
            <Container p={4} maxW='4xl' centerContent bgColor='gray.100'>
                <FormControl p={4}>
                    <FormLabel htmlFor='first-name'>First name</FormLabel>
                    <Input mb={4} id='first-name' bgColor='white' />
                    <FormLabel htmlFor='first-name'>Description</FormLabel>
                    <Textarea mb={4} rows='6' bgColor='white' />
                    <FormLabel htmlFor='first-name'>Profile Pic URL</FormLabel>
                    <Textarea mb={4} bgColor='white' />
                </FormControl>
            </Container>
            <Container p={6} mb={6} maxW='3xl' centerContent>
                <Button
                    colorScheme='teal'
                    size='lg'
                    borderRadius='full'
                >
                    Create Profile
                </Button>
            </Container>
        </>
    )
}

export default CreateProfile;