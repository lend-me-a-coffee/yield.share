import Header from "../../components/Header";
import {Button, Link} from "@chakra-ui/react"
import {NavLink} from "react-router-dom";

const ProfileSuccess = () => {
    return (
        <>
            <Header optionToCreate={false}/>
            <h1>Success on Creator Profile</h1>
            <Button colorScheme='teal' variant='solid' spacing={4}>
                <NavLink to="/detailView/0">
                    <Link>View Profile</Link>
                </NavLink>
            </Button>
        </>
    )
}

export default ProfileSuccess