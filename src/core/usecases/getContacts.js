import ContactsRepository from '../contracts/ContactsRepository.js';


const getContacts = async (request) => {
    if(request == null) return null;
    return ContactsRepository.getAll(request);
}

export default getContacts;