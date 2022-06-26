import Header from "../../components/Header";
import {Button, Link} from "@chakra-ui/react"

const ProfileSuccess = () => {
    return (
        <>
            <Header optionToCreate={false}/>
            <h1>Success on Creator Profile</h1>
            <Button colorScheme='teal' variant='solid' spacing={4}><Link href="/detailView/0" >View Profile</Link></Button>
        </>
    )
}

export default ProfileSuccess