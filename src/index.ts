import cors from "cors";
import "dotenv/config";
import express from "express";
import {createUser, Creator, CreatorData, fetchAllUsers, fetchUser, generateCommentMetadata} from "./creators";
import bodyParser from "body-parser";
import {getWalletByType, reportWalletStatuses} from "./blockchain/Wallets";
import {uploadComment} from "./blockchain/metadata";
import {toWalletType, WalletType} from "./blockchain/Wallet";
import {fetchData} from "./blockchain/ipfsApi";
import NodeCache from "node-cache";
import {CommentMetadata} from "./blockchain";
import path from "path";

const app = express();

const cache = new NodeCache({stdTTL: 30, checkperiod: 45});

app.use(cors());

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use("/api/health", (_, res) => {
    res.send("Ok");
});

app.get("/api/listCreators", async (req, res) => {
    const cachedCreators = cache.get<Creator[]>("all-creators");
    if (cachedCreators) {
        return res.json(cachedCreators);
    }
    const creators = await fetchAllUsers();
    cache.set("all-creators", creators);
    return res.json(creators);
});

app.post("/api/createUser", (req, res, next) => {
    const creatorData: Creator = req.body;
    createUser(creatorData)
        .then(_ => res.status(200))
        .catch(e => next(e));
})

app.get("/api/creator", async (req, res, next) => {
    const address = req.query.address as string;
    if (!address) {
        return res.status(400);
    }
    try {
        const cachedUser = cache.get<CreatorData>(address);
        if (cachedUser) {
            console.log(`Using cached user for ${address}`);
            return res.json(cachedUser);
        }
        const user = await fetchUser(address);
        if (!user) {
            return res.status(404);
        }
        const type: WalletType = toWalletType(user.chain);
        const wallet = getWalletByType(type);
        const nfts = await wallet.getAllNftMetadata(address);
        const nftMetadata = await Promise.all(nfts.map(ci => fetchData<CommentMetadata>(ci)));
        const parsedMetadata = nftMetadata.map(nft => {
            return {
                text: nft.name,
                author: address,
                amount: nft.attributes.find(a => a.trait_type === "staked amount")?.value,
                duration: nft.attributes.find(a => a.trait_type === "duration")?.value,
            }
        });

        const userData: CreatorData = {...user, comments: parsedMetadata};
        cache.set(address, userData);
        return res.json(userData);
    } catch (e) {
        return next(e);
    }
})

app.post("/api/uploadComment", async (req, res, next) => {
    try {
        const metadata = await generateCommentMetadata(req.body);
        const ipfsHash = await uploadComment(metadata);
        res.send(ipfsHash);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

app.get("/api/wallets", (req, res, next) => {
    req.setTimeout(30000);
    reportWalletStatuses()
        .then(statuses => {
            res.json(statuses);
        })
        .catch(next);
});

app.use("/", express.static("./client/build"));

app.get("*", (req, res) => res.sendFile(path.resolve("client", "build", "index.html")));


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
