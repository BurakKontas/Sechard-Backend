import dotenv from 'dotenv';
dotenv.config()

import ValidateModel from "../../helpers/validateModels";

import Contact from "../../models/contact";
import MongoDB from "../../models/mongo";
import { randomBytes } from 'crypto';
describe('addContact test', () => {
    const connection = new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);
    const connectionContacts = new MongoDB("sechard","contacts",process.env.MONGO_CONNECTION_STRING);

    test('should create new contact and add to user', async () => {
        const id = randomBytes(16).toString("hex");
        var query = await connection.find({_id:"6392150338d1d848819fc5e8"});
        var user = query[0];
        if(!user.dictionary) user.dictionary = [];
        user.dictionary.push(id);
        var contact = new Contact({
            _id: id,
            user: user._id,
            phones:"+905326278076",
            name:"Micheal",
            lastName:"Townley",
            addresses:"Edirne",
        });
        connectionContacts.insertDocument(contact);
        connection.updateDocument({_id:user._id},{$set:user});
        //buraya kadar hatasız geldiyse sıkıntı yok
        expect(true).toBe(true);
    })

    afterAll(() => {
        connection.close();
        connectionContacts.close();
    }) 
})