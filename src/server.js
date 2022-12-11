import express, { json } from "express";

//routes
import userRouter from "./core/routes/user.js";
import contactRouter from "./core/routes/contact.js";


//.env
import dotenv from 'dotenv';
import randomId from './core/helpers/randomId';
dotenv.config()

const PORT = process.env.PORT;

const server = express();
server.use(json());

//Routes
server.use(userRouter);
server.use(contactRouter);

//endpoints
//Hello world
server.get('/', (req, res) => {
    res.send("Hello World!");
});

//OK cevabı gelirse sunucu aktif
server.get('/status', (req, res) => {
    res.status(200).send({"status":"OK"});
});

server.get('randomid', (req,res) => {
    res.status(200).send(randomId());
})

server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
  

export default server;

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