//.env
import dotenv from 'dotenv';
import ValidateModel from '../helpers/validateModels';
dotenv.config()

import randomId from '../helpers/randomId';
import connections from '../helpers/connections';
import Contact from '../models/contact';
import connectionsClose from '../helpers/connectionsClose';

const addContacts = async (body) => {
    //bağlantılar
    const connect = connections();

    //gerekli dökümanları buluyoruz
    var query = await connect.users.find({_id:body.user});
    var contactsQuery = await connect.contacts.find({user:body.user});

    //aynı isimde biri daha var mı ?
    var ifHasName = contactsQuery.filter((contact) => contact.name == body.name);
    if(ifHasName.length > 1) {
        return { error:true,reason:`[${body.name}] zaten ekli.` };
    }

    //çok mümkün bir error değil ama koymakta fayda var.
    if(query.length == 0) {
        return { error:true,reason:`[${body._id}] idsinde bir kullanıcı bulunamadı.` };
    }

    //validate işlemlerini yapıyoruz
    const contact = new Contact(body);
    const validation = await ValidateModel(contact);
    if(validation.error == true) {
        connectionsClose(connect);
        return validation;
    }
    //burdan sonrasında valid contactımız ve userimiz var

    //crypto ile oluşturduğumuz id yi veriyoruz
    contact._id = randomId();
    await connect.contacts.insertDocument(contact);

    //userin dictionarysine ekliyoruz
    var user = query[0];
    if(!user.dictionary) user.dictionary = [];
    user.dictionary.push(id);
    await connect.users.updateDocument({_id:body.user},{$set:user});

    connectionsClose(connect);

    return {
        error:false,
        contact:contact,
        user:user,
    };
};

export default addContacts;