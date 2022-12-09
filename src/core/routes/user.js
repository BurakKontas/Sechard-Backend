//.env
import dotenv from 'dotenv';
dotenv.config()

import { Router } from "express";

//functions
import getContacts from '../usecases/getContacts.js'
import addContacts from '../usecases//addContacts.js';

//değişkenler
const userRouter = Router();
const server = userRouter; //server yazmak alışkanlık oldu

server.post("/user/getcontact", async (req,res) => {
    const contacts = await getContacts(req.body);
    res.status(200).send(contacts);
}); 

server.post('/user/addcontact', async (req,res) => {
    const result = await addContacts(req);
    if(result.error) {
        res.status(400).send(result)
    }
    res.status(201).send(result);
});

server.get("/test", async (req,res) => {

    res.send("Done!");
})

export default userRouter;