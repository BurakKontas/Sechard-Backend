import UsersRepository from './../../contracts/UsersRepository';

describe("getUser test", () => {
  test("should get user from database", async () => {
    setTimeout(async () => {
      var createdUser = await UsersRepository.get({_id:"6392150338d1d848819fc5e8"});
      expect.anything(createdUser);
    }, 3000);
  }, 10000);
});
