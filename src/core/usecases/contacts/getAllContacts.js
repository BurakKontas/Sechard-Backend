import ContactsRepository from './../../contracts/ContactsRepository.js';

//expected {userid:"123456789"}
const getAllContacts = async (request) => {
    if(request == null) return null;
    const body = request.body;
    return await ContactsRepository.getAll({user:body.userid},{user:0});
}

export default getAllContacts;