import randomId from './../../helpers/randomId';
import UsersRepository from './../../contracts/UsersRepository';
import User from './../../entities/user';

describe("updateUser test", () => {
    var id = "random-ID";

  beforeAll(async () => {
    var result = await UsersRepository.create(new User({_id:id}));
    id = result.user._id;
  })
  afterAll(async () => {
    //testi tekrar çalıştırırken hata verir
    await UsersRepository.delete(id);
  });
  
  test("should update user dictionary", async () => {
    setTimeout(async () => {
    await UsersRepository.update(["123","456","789"],id);
    setTimeout(async () => {
      var updatedUser = await UsersRepository.get({_id:id});
      expect(["123","456","789"]).toStrictEqual(updatedUser[0].dictionary);
    }, 3000);
    },3000)
  }, 20000);
});
