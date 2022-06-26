import cors from "cors";
import "dotenv/config";
import express from "express";
import {createUser, Creator, fetchAllUsers, fetchUser, generateCommentMetadata} from "./creators";
import bodyParser from "body-parser";
import {reportWalletStatuses} from "./blockchain/Wallets";
import {uploadComment} from "./blockchain/metadata";

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

app.get("/api/creator", (req, res, next) => {
    const address = req.query.address as string;
    if (!address) {
        return res.status(400);
    }
    return fetchUser(address)
        .then(user => res.json(user))
        .catch(e => next(e));
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
