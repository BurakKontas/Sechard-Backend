//.env
import dotenv from 'dotenv';
dotenv.config()

import { Router } from "express";

//functions
import getUser from './../usecases/users/getUser.js';
import deleteUser from '../usecases/users/deleteUser.js';
import updateUser from './../usecases/users/updateUser.js';
import addUser from './../usecases/users/addUser.js';

//değişkenler
const userRouter = Router();
const server = userRouter; //server yazmak alışkanlık oldu

server.get("/user/getUser/:userid", async (req,res) => {
    try {
        const user = await getUser(req);
        res.status(200).send(user);
    } catch(err) {
        res.status(400).send(err);
    }
});

server.get("/user/getUser/", async (req,res) => {
    res.status(400).send({error:true,reason:"ID Girilmedi"});
});

//ben olsam böyle birşey yapmazdım JWT olmadan en azından json lu halde tutmalıyım bence
server.delete("/user/deleteUser", async (req,res) => {
    try {
        const user = await deleteUser(req);
        res.status(200).send(user);
    } catch(err) {
        res.status(400).send(err);
    }
});

server.post("/user/addUser", async (req,res) => {
    try {
        const user = await addUser(req);
        res.status(201).send(user);
    } catch(err) {
        res.status(400).send(err);
    }
});

server.put("/user/updateUser", async (req,res) => {
    try {
        const user = await updateUser(req);
        res.status(200).send(user);
    } catch(err) {
        res.status(400).send(err);
    }
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

export default userRouter;