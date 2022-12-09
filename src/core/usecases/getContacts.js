import ContactsRepository from '../contracts/ContactsRepository.js';
import connections from '../helpers/connections.js';
import connectionsClose from '../helpers/connectionsClose.js';


const getContacts = async (request) => {
    if(request == null) return null;
    return ContactsRepository.getAll(request);
}

export default getContacts;