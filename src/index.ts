import cors from "cors";
import "dotenv/config";
import express from "express";
import {CommentInput, createUser, Creator, fetchAllUsers, fetchUser, generateCommentMetadata} from "./creators";
import bodyParser from "body-parser";
import {getWalletByType, reportWalletStatuses} from "./blockchain/Wallets";
import {uploadComment} from "./blockchain/metadata";
import {toWalletType, WalletType} from "./blockchain/Wallet";
import {fetchData} from "./blockchain/ipfsApi";

const app = express();

app.use(cors());

const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use("/", express.static("./client/build"));

app.use("/health", (_, res) => {
    res.send("Ok");
});

app.get("/api/listCreators", async (req, res) => {
    const creators = await fetchAllUsers();
    res.json(creators);
});

app.get("/api/createUser", (req, res, next) => {
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
        const user = await fetchUser(address);
        if (!user) {
            return res.status(404);
        }
        const type: WalletType = toWalletType(user.chain);
        const wallet = getWalletByType(type);
        const nfts = await wallet.getAllNftMetadata(address);
        const nftMetadata = await Promise.all(nfts.map(ci => fetchData<CommentInput>(ci)));
        const userData = {...user, nft: nftMetadata};
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
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
