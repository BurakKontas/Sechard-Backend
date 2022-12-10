import ContactsRepository from './../../contracts/ContactsRepository.js';

//expected {userid:"123456789",text:"Mic"} //Micheal Mich Micelangelo "Mic%"
const searchContact = async (request) => {
    if(request == null) return null;
    const body = request.body;
    return await ContactsRepository.search(body.userid,body.text,{user:0});
}

export default searchContact;