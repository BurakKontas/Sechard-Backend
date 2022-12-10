import ContactsRepository from "../../contracts/ContactsRepository";

describe("getAllContacts test", () => {
  test("should get all contacts of user", async () => {
    var json = {
      userid: "6392150338d1d848819fc5e8"
    };
    var searched = await ContactsRepository.getAll({
      user: json.userid
    });

    expect.anything(searched)
  });
});
