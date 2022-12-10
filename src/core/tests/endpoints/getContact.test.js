import ContactsRepository from "../../contracts/ContactsRepository";

describe("getContact test", () => {
  test("should get one contact from users dictionary", async () => {
    var json = {
      userid: "6392150338d1d848819fc5e8",
      name: "Micheale",
    };
    var searched = await ContactsRepository.get({
      user: json.userid,
      name: json.name,
    });
    const expected = 
    [
      {
        _id: "c0ae92f0c466ea6e0e3ac4bea15f2f32",
        user: "6392150338d1d848819fc5e8",
        name: "Micheale",
        phones: "+905326278076",
        emails: [],
        addresses: "Edirne",
        lastName: "Townley",
      },
    ];

    expect(searched).toEqual(expected);
  });
});
