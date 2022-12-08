import express, { json } from "express";
import dotenv from 'dotenv';
import userRouter from "./routes/user.js";
dotenv.config()

// import MongoDB from "./models/mongo.js";
// import User from "./models/user.js";
// import Contact from "./models/contact.js";

// const mongo = new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);

const PORT = process.env.PORT;

const server = express();
server.use(json());

server.use(userRouter);


server.get('/', (req, res) => {
    res.send("Hello World!");
});

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