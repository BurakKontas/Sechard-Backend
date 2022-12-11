import Contact from "../../entities/contact.js";
import ContactsRepository from "../../contracts/ContactsRepository.js";

describe('deleteContact test', () => {
    beforeAll(async () => {
        //yoksa eklesin varsa catche girip birşey yapmayacak
        try {
            var contact = new Contact({
                user: "6392150338d1d848819fc5e8",
                phones:"+905326278076",
                name:"Micheal",
                addresses:"Edirne",
            });
             await ContactsRepository.create(contact)
        } catch(err) {}
    },10000);
    test('should delete contact', async () => {
        //databaseye güncellenmesi için zaman veriyoruz
        setTimeout(async () => {
            await ContactsRepository.delete("Micheal","6392150338d1d848819fc5e8");
            var deletedContact = await ContactsRepository.get({user:"6392150338d1d848819fc5e8",name:"Micheal"});
            expect(deletedContact).toStrictEqual([]);
        },3000)
    }, 10000)
})