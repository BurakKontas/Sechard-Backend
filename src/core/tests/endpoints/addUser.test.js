import randomId from '../../helpers/randomId';
import UsersRepository from './../../contracts/UsersRepository';
import User from './../../entities/user';

describe('addUser test', () => {

    test('should create new user', async () => {
        var id =  randomId()
        var user = new User({
            _id:id,
        });
        await UsersRepository.create(user);
        setTimeout(async () => {
            var addedUser = await UsersRepository.get({_id:id});
            expect(addedUser[0]).toBe(user);
        },3000)
    },10000)
})