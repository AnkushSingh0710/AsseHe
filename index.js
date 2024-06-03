import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5005;

const db = new pg.Client({
    user: "Milan_owner",
    host: "ep-polished-smoke-a12sfj0v.ap-southeast-1.aws.neon.tech", 
    database: "AsseHe",
    password: "yXv7R6fGMABz",
    port: 5432,
    ssl: "true",
  });

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/public/style.css", (req, res) => {
    res.sendFile(__dirname + "/public/style.css");
});

app.use('/images', express.static(__dirname + '/images'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

app.post("/", async (req, res) => {
    const {username, password } = req.body;

    const result = await db.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, password]
    );
    console.log(result);
    // res.sendFile(__dirname + "/views/home.html");
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
