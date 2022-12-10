import ContactsRepository from '../../contracts/ContactsRepository';

describe('searchContact test', () => {

    test('should search contacts based on user id', async () => {
        var userId = "6392150338d1d848819fc5e8";
        var searched = await ContactsRepository.search(userId,"Mic",{_id:0});
        expect.anything(searched);
    })
})