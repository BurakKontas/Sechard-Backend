import dotenv from 'dotenv';
import connections from '../../helpers/connections';
import connectionsClose from '../../helpers/connectionsClose';

describe('mongo test', () => {
    let connect;

    beforeAll(async () => {
        connect = await connections();
    })

    afterAll(async () => {
        connectionsClose(connect);
    });

    it('should insert a doc into collection', async () => {
        const mockUser = {_id: 'some-user-id', name: 'John'};
        await connect.users.insertDocument(mockUser);

        const insertedUser = await connect.users.find({_id: 'some-user-id'});
        expect(insertedUser).toEqual([mockUser]);
    });

    it('should update a doc', async () => {
        const mockUser = {_id: 'some-user-id', name: 'Mike'};
        await connect.users.updateDocument({_id: 'some-user-id'},{$set:mockUser});

        const insertedUser = await connect.users.find({_id: 'some-user-id'});
        expect(insertedUser).toEqual([mockUser]);
    });

    it('should delete doc from collection', async () => {
        await connect.users.deleteDocument({_id: 'some-user-id'});
        const deletedUser = await connect.users.find({_id: 'some-user-id'});
        expect(deletedUser).toStrictEqual([]);
    });

    it('should create collection', async () => {
        await connect.users.createCollection("testCollection");
    });

    it('should drop collection', async () => {
        await connect.users.dropCollection("testCollection");
    })
});