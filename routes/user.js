//.env
import dotenv from 'dotenv';
dotenv.config()

import { Router } from "express";
import { randomBytes } from 'crypto';
import ValidateModel from "../helpers/validateModels.js";

//models
import User from "../models/user.js";
import Contact from "../models/contact.js";
import MongoDB from './../models/mongo.js';


const userRouter = Router();
const server = userRouter; //server yazmak alışkanlık oldu


server.post('/user/addcontact', async (req,res) => {
    const connection = new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);
    const connectionContacts = new MongoDB("sechard","contacts",process.env.MONGO_CONNECTION_STRING);

    const body = req.body;
    var user = await connection.find({_id:body.userID});
    //çok mümkün bir error değil ama koymakta fayda var.
    if(user.length == 0) res.status(400).send({error:true,reason:`[${body._id}] idsinde bir kullanıcı bulunamadı.`}) 

    const contact = new Contact(body);
    const validation = ValidateModel(contact);
    if(await validation.error == true) {
        connection.close();
        connectionContacts.close();
        res.status(400).send(validation);
    }
    //burdan sonrasında valid contactımız ve userimiz var

    //crypto ile oluşturduğumuz id yi veriyoruz
    const id = randomBytes(16).toString("hex");
    contact._id = id;
    connectionContacts.insertDocument(contact);

    //userin dictionarysine ekliyoruz
    user.dictionary.push(id);
    connection.updateDocument({_id:body.userID},{$set:user});

    connection.close();
    connectionContacts.close();

    res.status(201).send({
        error:false,
        contact:contact,
        user:user,
    });
});

server.get("/test", async (req,res) => {

        res.send("Done!");
})

export default userRouter;