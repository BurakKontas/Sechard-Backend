//.env
import dotenv from 'dotenv';
dotenv.config()

import { Router } from "express";
import addContacts from '../functions/addContacts.js';

//functions
import getContacts from '../functions/getContacts.js';


const userRouter = Router();
const server = userRouter; //server yazmak alışkanlık oldu

server.post("/user/getcontact", async (req,res) => {
    const contacts = await getContacts(req.body);
    res.status(200).send(contacts);
}); 

server.post('/user/addcontact', async (req,res) => {
    const result = await addContacts(body);
    if(result.error) {
        res.status(400).send(result)
    }
    res.status(201).send(result);
});

server.get("/test", async (req,res) => {

    res.send("Done!");
})

export default userRouter;