//.env
import dotenv from 'dotenv';
dotenv.config()

import { Router } from "express";

//cache
import pkg from 'express-api-cache';
const { cache } = pkg;

//functions
import getAllContacts from '../usecases/contacts/getAllContacts.js'
import addContact from '../usecases/contacts/addContact.js';
import deleteContacts from '../usecases/contacts/deleteContact.js';
import getContact from './../usecases/contacts/getContact.js';
import updateContact from './../usecases/contacts/updateContact.js';
import searchContact from './../usecases/contacts/searchContact.js';

//değişkenler
const contactRouter = Router();
const server = contactRouter; //server yazmak alışkanlık oldu

//name + id yi verdiğimizden dolayı post
server.post("/contact/getAllcontacts", cache("5 seconds"), async (req,res) => {
    try {
        const contacts = await getAllContacts(req);
        res.status(200).send(contacts);
    } catch(err) {
        res.status(400).send(err)
    }
}); 

server.post('/contact/getcontact', cache("5 seconds"), async (req,res) => {
    try {
        const result = await getContact(req);
        res.status(200).send(result);
    } catch(err) {
        res.status(400).send(err)
    }
});

server.post('/contact/addcontact', async (req,res) => {
    try {
        const result = await addContact(req);
        res.status(201).send(result);
    } catch(err) {
        res.status(400).send(err)
    }
});

server.delete('/contact/deletecontact', async (req,res) => {
    try {
        const result = await deleteContacts(req);
        res.status(200).send(result);
    } catch(err) {
        res.status(400).send(err)
    }
});

server.put('/contact/updatecontact', async (req,res) => {
    try {
        const result = await updateContact(req);
        res.status(200).send(result);
    } catch(err) {
        res.status(400).send(err)
    }
});

server.post('/contact/searchcontacts', cache("5 seconds"), async (req,res) => {
    try {
        const result = await searchContact(req);
        res.status(200).send(result);
    } catch(err) {
        res.status(400).send(err)
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

export default contactRouter;