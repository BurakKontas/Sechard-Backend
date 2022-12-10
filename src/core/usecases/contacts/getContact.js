import ContactsRepository from './../../contracts/ContactsRepository.js';

//expected {userid:"123456789",name:"Micheal"}
const getContact = async (request) => {
    if(request == null) return null;
    const body = request.body;
    return await ContactsRepository.get({user:body.userid,name:body.name},{user:0});
}

export default getContact;