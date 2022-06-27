import cors from "cors";
import "dotenv/config";
import express from "express";
import {createUser, Creator, CreatorData, fetchAllUsers, fetchUser, generateCommentMetadata} from "./creators";
import bodyParser from "body-parser";
import {reportWalletStatuses} from "./blockchain/Wallets/Wallets";
import {uploadComment} from "./blockchain/metadata";
import NodeCache from "node-cache";
import path from "path";
import {CreatorManager} from "./creators/Creator";

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
    console.log(`creating user for ${creatorData.address}`);
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

        const creator = new CreatorManager(user);
        const comments = await creator.getComments();

        const userData: CreatorData = {...user, comments};
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
