import ContactsRepository from './../../contracts/ContactsRepository.js';

//expected {name:"Micheal",userid:"123456789"}
const deleteContacts = async (request) => {
    if(request == null) return null;
    const body = request.body;
    return await ContactsRepository.delete(body.name,body.userid);
}

export default deleteContacts;