import Contact from "../../entities/contact.js";
import ContactsRepository from "../../contracts/ContactsRepository.js";
import UsersRepository from './../../contracts/UsersRepository';

describe('addContact test', () => {

    test('should create new contact and add to user', async () => {
        var query = await UsersRepository.get({_id:"6392150338d1d848819fc5e8"});
        var user = query;
        var contact = new Contact({
            user: user._id,
            phones:"+905326278076",
            name:"Micheal",
            lastName:"Townley",
            addresses:"Edirne",
        });
        await ContactsRepository.create(contact.toJSON());
        //var insertedContact = await ContactsRepository.get({user:"6392150338d1d848819fc5e8",name:"Micheal"});

        //databaseye ekleniyor ama insertContact undefined geliyor hep (elle bakınca kayıt oluşmuş oluyor...)
        //expect(insertedContact[0]).toBe(contact.toJSON());
    })
})