import Contact from "../../entities/contact.js";
import randomId from "../../helpers/randomId.js";
import connections from "../../helpers/connections.js";
import connectionsClose from "../../helpers/connectionsClose.js";
import ContactsRepository from "../../contracts/ContactsRepository.js";

describe('addContact test', () => {

    test('should create new contact and add to user', async () => {
        const connect = await connections()
        const id = randomId();
        var query = await connect.users.find({_id:"6392150338d1d848819fc5e8"});
        var user = query[0];
        var contact = new Contact({
            user: user._id,
            phones:"+905326278076",
            name:"Micheal",
            lastName:"Townley",
            addresses:"Edirne",
        });
        await ContactsRepository.create({body:contact.toJSON()});
        var insertedContact = await connect.contacts.find({name:"Micheal",user:user._id},{_id:0});
        connectionsClose(connect);
        expect(contact.toJSON()).toEqual(insertedContact[0]);
    })
})