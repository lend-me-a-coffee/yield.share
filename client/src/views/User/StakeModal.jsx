import {
    Box, Button,
    Flex,
    NumberInput,
    NumberInputField,
    Radio,
    RadioGroup,
    SimpleGrid,
    Spacer,
    Textarea
} from "@chakra-ui/react";
import {useState} from "react";
import {useWallet} from "../../context/Wallet";
import {ethers} from "ethers";
import commentJson from "../../artifacts/contracts/CreatorStaking.sol/Comment.json"
import {serverUrl} from "../../services/serverUrl";
import axios from "axios";

export const StakeModal = ({onSupportClose, contractAddress}) => {
    const wallet = useWallet();
    const [value, setValue] = useState(1);
    const [amount, setAmount] = useState(0.001);
    const [comment, setComment] = useState("");

    const submit = async () => {
        const data = {
            comment: comment,
            creatorAddress: contractAddress,
            amount: Number(amount),
            duration: Number(value)
        };

        console.log("data", data);

        const url = `${serverUrl}uploadComment`;

        const call = await axios.post(url, data);

        const ipfs = call.data;
        console.log("Got IPFS Hash", ipfs);

        const contract = new ethers.Contract(contractAddress, commentJson.abi, wallet.provider);

        const callResult = await contract.stake(value, ipfs, {value: ethers.utils.parseEther(`${amount}`)});
        console.log(callResult);
        onSupportClose();
    }

    return (
        <Box
            bgColor="#f3f3f3"
            mr={6} ml={6} p={10}
        >
            <SimpleGrid columns={{base: 1, md: 2}} mb={4}>
                <Box>
                    <Box mb={2} fontWeight="semibold">Select Amount</Box>
                    <NumberInput
                        mr={2}
                        defaultValue={amount}
                        min={0}
                        onChange={e => setAmount(e.target.value)}
                    >
                        <NumberInputField placeholder="Amount" bgColor="#fff"/>
                    </NumberInput>
                </Box>
                <Box>
                    <Box mb={2} fontWeight="semibold">Select Asset</Box>
                    <Box
                        p={2}
                        color="#000"
                        borderRadius="md"
                        border="solid 1px #ccc"
                        align="center"
                        fontWeight="semibold"
                    >
                        Ethereum
                    </Box>
                </Box>
            </SimpleGrid>

            <Box mb={2} fontWeight="semibold">Set Staking Duration</Box>
            <Box
                p={6} mb={4}
                bgColor="#fff"
                border="solid 1px #e2e8f0"
                borderRadius="md"
            >
                <RadioGroup
                    onChange={e => setValue(e)}
                    value={value}
                >
                    <Flex>
                        <Radio value="1">1 month</Radio>
                        <Spacer/>
                        <Radio value="2">3 months</Radio>
                        <Spacer/>
                        <Radio value="3">6 months</Radio>
                    </Flex>
                </RadioGroup>
            </Box>

            <Box mb={2} fontWeight="semibold">Add Support Comment</Box>
            <Textarea
                mb={4}
                placeholder="Keep up the good work! We're rooting for you!"
                bgColor="#fff"
                onChange={e => setComment(e.target.value)}
            />

            <Box align="center">
                <Button
                    onClick={submit}
                    borderRadius="md"
                    size="lg"
                    bgColor="#4791D1"
                    color="#fff"
                >
                    Confirm Staking Assets
                </Button>
            </Box>
        </Box>
    )
}