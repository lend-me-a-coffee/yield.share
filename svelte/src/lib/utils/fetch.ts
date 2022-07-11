import axios from "axios";
import { serverUrl } from "../stores/server";

export interface Creator {
    name: string;
    tagline: string;
    links: string[];
    address: string;
    description: string;
    photo: string;
    chain: string;
}

export interface Comment {
    text: string;
    author?: string;
    amount: number;
    duration: number;
    id: number;
}

export interface CreatorData extends Creator {
    comments: Comment[];
}

export const fetchCreators = async (): Promise<Creator[]> => {
    const call = await axios.get(`${serverUrl}listCreators`);
    return call.data as Creator[];
}

export const fetchCreator = async(address:string):Promise<CreatorData> => {
    const call = await axios.get(`${serverUrl}creator?address=${address}`);
    return call.data as CreatorData;
}
