import randomId from './../../helpers/randomId';
import User from './../../entities/user';
import UsersRepository from './../../contracts/UsersRepository';

describe('deleteUser test', () => {
    var id = randomId();
    beforeAll(async () => {
        //yoksa eklesin varsa catche girip birşey yapmayacak
        try {
            var user = new User({
                _id:id,
                dictionary:[]
            })
             await UsersRepository.create(user)
        } catch(err) {}
    },10000);
    test('should delete user', async () => {
        //databaseye güncellenmesi için zaman veriyoruz
        setTimeout(async () => {
            await UsersRepository.delete(id);
            var deletedContact = await UsersRepository.get({_id:id});
            expect(deletedContact).toStrictEqual([]);
        },3000)
    }, 30000)
})