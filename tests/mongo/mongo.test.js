import dotenv from 'dotenv';
dotenv.config()

import MongoDB from '../../models/mongo';

describe('mongo test', () => {
    let connection = new MongoDB();

    beforeAll(async () => {
        connection = new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a doc into collection', async () => {
        const mockUser = {_id: 'some-user-id', name: 'John'};
        await connection.insertDocument(mockUser);

        const insertedUser = await connection.find({_id: 'some-user-id'});
        expect(insertedUser).toEqual([mockUser]);
    });

    it('should update a doc', async () => {
        const mockUser = {_id: 'some-user-id', name: 'Mike'};
        await connection.updateDocument({_id: 'some-user-id'},{$set:mockUser});

        const insertedUser = await connection.find({_id: 'some-user-id'});
        expect(insertedUser).toEqual([mockUser]);
    });

    it('should delete doc from collection', async () => {
        await connection.deleteDocument({_id: 'some-user-id'});
        const deletedUser = await connection.find({_id: 'some-user-id'});
        expect(deletedUser).toStrictEqual([]);
    });

    it('should create collection', async () => {
        await connection.createCollection("testCollection");
    });

    it('should drop collection', async () => {
        await connection.dropCollection("testCollection");
    })
});