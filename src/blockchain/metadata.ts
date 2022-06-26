import fs from "fs";
import {CommentMetadata} from "./index";
import {storeFile} from "./ipfsApi";

const writeFile = (content: string): Promise<string> => {
    const dir = "./metadata";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const fileName = `${dir}/metadata${new Date().getUTCMilliseconds()}.json`;
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileName, content, err => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve(fileName);
        });
    });
}

export const uploadComment = async (content: CommentMetadata): Promise<string> => {
    const fileName = await writeFile(JSON.stringify(content));

    const ipfsHash = await storeFile(fileName);
    fs.rm(fileName, (err) => {
        if (err) {
            console.error(err);
        }
    });

    return ipfsHash;
}