import ContactsRepository from "../../contracts/ContactsRepository";
import Contact from './../../entities/contact';

describe("getContact test", () => {
  beforeAll(async () => {
    try {
      var contact = new Contact({
        user:"6392150338d1d848819fc5e8",
        addresses:["Edirne"],
        emails:["test@test.com"],
        name:"Michealea",
        phones:["5326278076"],
        company:"E-CORP",
      })
      await ContactsRepository.create(contact);
    } catch(err) {} //varsa zaten yaratmasın tekrar
  },10000);

  afterAll(async () => {
    setTimeout(async () => {
      await ContactsRepository.delete("Michealea","6392150338d1d848819fc5e8")
    },3000)
  },10000)

  test("should get one contact from users dictionary", async () => {
    var json = {
      userid: "6392150338d1d848819fc5e8",
      name: "Michealea",
    };
    var searched;
    setTimeout(async () => {
      searched = await ContactsRepository.get({
        user: json.userid,
        name: json.name,
      });
      expect.anything(searched)
    },3000)
  },10000);
});
