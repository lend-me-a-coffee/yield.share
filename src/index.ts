import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();

app.use(cors());

app.use("/", express.static("./client/build"));

app.use("/health", (_, res) => {
    res.send("Ok");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
