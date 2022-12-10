import Contact from "../../entities/contact.js";
import ContactsRepository from "../../contracts/ContactsRepository.js";
import randomId from './../../helpers/randomId';

describe('addContact test', () => {

    test('should create new contact and add to user', async () => {

        var contact = new Contact({
            user: "6392150338d1d848819fc5e8",
            phones:"+905326278076",
            name:randomId(),
            lastName:"Townley",
            addresses:"Edirne",
        });
        await ContactsRepository.create(contact.toJSON());
        setTimeout(async () => {
            var insertedContact = await ContactsRepository.get({user:"6392150338d1d848819fc5e8",name:contact.name},{_id:0});
            expect(insertedContact[0]).toStrictEqual(contact.toJSON());
        },3000)
    },10000)
})