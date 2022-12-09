import ContactsRepository from './../../contracts/ContactsRepository.js';

//expected <Contact> type
const addContact = async (request) => {
    if(request == null) return null;
    return await ContactsRepository.create(request.body)
};

export default addContact;