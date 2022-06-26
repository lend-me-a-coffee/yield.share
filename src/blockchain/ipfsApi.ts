import fs from "fs";
import mime from "mime";
import {File, NFTStorage} from "nft.storage";
import path from "path";
import axios from "axios";

export async function storeFile(filePath: string) {
    const file = await fileFromPath(filePath)

    const nftstorage = new NFTStorage({token: process.env.NFT_STORAGE_API_KEY!})

    return await nftstorage.storeBlob(file);
}

export async function fetchData(cid: string) {
    const config = {
        headers: {
            "x-api-key": process.env.TATUM_API!
        }
    };

    const call = await axios.get(`https://api-eu1.tatum.io/v3/ipfs/${cid}`, config);
    return call.data;
}

async function fileFromPath(filePath: string) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    if (!type) {
        throw new Error(`Type for ${filePath} is null!`);
    }
    return new File([content], path.basename(filePath), {type})
}