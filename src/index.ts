import cors from "cors";
import "dotenv/config";
import express from "express";
import {reportWalletStatuses} from "./blockchain/Wallets";

const app = express();

app.use(cors());

app.use("/", express.static("./client/build"));

app.use("/health", (_, res) => {
    res.send("Ok");
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
