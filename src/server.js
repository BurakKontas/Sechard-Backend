import express, { json } from "express";

//routes
import userRouter from "./core/routes/user.js";
import contactRouter from "./core/routes/contact.js";

//cors

import pkg2 from 'cors';
const cors  = pkg2;
//.env
import dotenv from 'dotenv';
import randomId from './core/helpers/randomId.js';
dotenv.config()

const PORT = process.env.PORT;

const server = express();
server.use(json());

server.use(cors({
    origin:'*',
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

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

server.get('/randomid', (req,res) => {
    var random = randomId();
    res.status(200).send({id:random});
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