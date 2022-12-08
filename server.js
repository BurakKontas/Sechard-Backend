import express, { json } from "express";
import dotenv from 'dotenv';

dotenv.config()

import MongoDB from "./models/mongo.js";
import User from "./models/user.js";
import Contact from "./models/contact.js";
import ValidateModel from "./helpers/validateModels.js";

const mongo = new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);

const PORT = process.env.PORT;

const server = express();
server.use(json());


server.get('/', (req, res) => {
    res.send("Hello World!");
});

server.get('/test', async (req, res) => {
    const user = new User({
    })
    const output = await ValidateModel(user);
    res.send(output)
})

// server.get
// server.post
// server.put
// server.delete
// server.options
// server.head
// server.copy
// server.patch
// server.lock
// server.unlock
// server.propfind
// server.purge

server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
  

export default server;