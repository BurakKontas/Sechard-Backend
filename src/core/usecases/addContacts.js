import ContactsRepository from '../contracts/ContactsRepository.js';

const addContacts = async (request) => {
    if(request == null) return null;
    return ContactsRepository.create(request)
};

export default addContacts;