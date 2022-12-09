import ContactsRepository from './../../contracts/ContactsRepository.js';

//expected {newContact:<Contact>,oldname:"Micheal"}
const updateContact = async (request) => {
    if(request == null) return null;
    const body = request.body;
    return await ContactsRepository.update(body.newContact,body.oldName);
}

export default updateContact;