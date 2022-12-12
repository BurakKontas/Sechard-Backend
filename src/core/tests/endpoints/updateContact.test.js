import ContactsRepository from "../../contracts/ContactsRepository";
import Contact from './../../entities/contact';

describe("updateContact test", () => {
  beforeAll(async () => {
    //olmayan contactı güncelleyemeyiz
    try {
        var contact = new Contact({
            user: "6392150338d1d848819fc5e8",
            phones:"+905326278076",
            name:"Micheal",
            addresses:"Edirne",
        });
        await ContactsRepository.create(contact.toJSON());
    } catch(err) {}
  },10000)

  afterAll(async () => {
    //testi tekrar çalıştırırken hata verir
    await ContactsRepository.delete("Michealera","6392150338d1d848819fc5e8");
  },10000);

  var json = [
    {
      newContact: {
        user: "6392150338d1d848819fc5e8",
        phones: "+905326278076",
        name: "Michealera",
        lastName: "Townley",
        addresses: "Edirne",
      },
      oldName: "Micheal",
    },
  ];
  test("should update contact", async () => {
    await ContactsRepository.update(json[0].newContact, json[0].oldName);
    setTimeout(async () => {
      var updatedContact = await ContactsRepository.get(
        { name: json[0].newContact.name, user: json[0].newContact.user },
        { _id: 0 }
      );
      expect(json[0].newContact).toEqual(updatedContact[0]);
    }, 3000);
  }, 10000);
});
