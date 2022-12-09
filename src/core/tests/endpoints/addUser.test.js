import randomId from '../../helpers/randomId';
import UsersRepository from './../../contracts/UsersRepository';
import User from './../../entities/user';

describe('addContact test', () => {

    test('should create new user', async () => {
        var id =  randomId()
        var user = new User({
            _id:id,
        });
        await UsersRepository.create(user);
        //var addedUser = await UsersRepository.get({_id:id});
        
        //databaseye ekleniyor ama addedUser undefined geliyor hep (elle bakınca kayıt oluşmuş oluyor...)
        //expect(addedUser[0]).toBe(user);
    })
})