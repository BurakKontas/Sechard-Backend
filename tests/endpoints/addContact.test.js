import Contact from "../../models/contact";
import connections from '../../helpers/connections';
import connectionsClose from '../../helpers/connectionsClose';
import randomId from '../../helpers/randomId';

describe('addContact test', () => {
    const connect = connections()

    test('should create new contact and add to user', async () => {
        const id = randomId();
        var query = await connect.users.find({_id:"6392150338d1d848819fc5e8"});
        var user = query[0];
        if(!user.dictionary) user.dictionary = [];

        user.dictionary.push(id);

        var contact = new Contact({
            _id: id,
            user: user._id,
            phones:"+905326278076",
            name:"Micheal",
            lastName:"Townley",
            addresses:"Edirne",
        });
        await connect.contacts.insertDocument(contact);
        await connect.users.updateDocument({_id:user._id},{$set:user});
        //buraya kadar hatasız geldiyse sıkıntı yok
        expect(true).toBe(true);
    })

    afterAll(() => {
        connectionsClose(connect);
    }) 
})