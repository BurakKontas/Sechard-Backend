//.env
import dotenv from 'dotenv';
dotenv.config()

import Contact from '../entities/contact';
import ValidateModel from '../helpers/validateModels';
import randomId from '../helpers/randomId';
import ContactDTO from './../dtos/contactDTO';
import UsersRepository from './UsersRepository';
import MongoDB from './../entities/mongo';

class ContactsRepository {
    
    static async #contactsConnection() {
        return new MongoDB("sechard","contacts",process.env.MONGO_CONNECTION_STRING);
    }

    static async get(query) {
        //dümdüz alıyoruz
        const connection = await this.#contactsConnection();
        var founded = await connection.find(query);
        if(founded.length == 0) return {error:true,reason:"Böyle bir contact bulunamadı"};
        var contactdto = new ContactDTO(founded[0]);
        connection.close();
        return contactdto;
    }
 
    static async getAll(query) {
        //dümdüz alıyoruz
        const connection = await this.#contactsConnection();
        var founded = await connection.find(query);
        var dtos = [];
        founded.map((contact) => {
            dtos.push(new ContactDTO(contact));
        })
        connection.close();
        return dtos;
    }
 
    static async create(body) {
        //bağlantılar
        const connection = await this.#contactsConnection();

        //gerekli dökümanları buluyoruz
        var query = await UsersRepository.get({_id:body.user});
        var user = query;

        //aynı isimde biri daha var mı ?
        var ifHasName = user.dictionary.filter((contact) => contact == body.name);
        if(ifHasName.length > 0) {
            connection.close();
            return { error:true,reason:`[${body.name}] zaten ekli.` };
        }
        
        //çok mümkün bir error değil ama koymakta fayda var.
        if(query.length == 0) {
            connection.close();
            return { error:true,reason:`[${body._id}] idsinde bir kullanıcı bulunamadı.` };
        }
        
        //validate işlemlerini yapıyoruz
        const contact = new Contact(body);
        const validation = await ValidateModel(contact);
        if(validation.error == true) {
            connection.close();
            return validation;
        }
        //burdan sonrasında valid contactımız ve userimiz var
        
        //crypto ile oluşturduğumuz id yi veriyoruz
        contact._id = randomId();
        await connection.insertDocument(contact);
        
        //userin dictionarysine ekliyoruz
        if(!user.dictionary) user.dictionary = [];
        //isimler unique olduğundan böyle birşey yapabilirim
        user.dictionary.push(contact.name);
        await UsersRepository.update(user,body.user);
        connection.close();
        
        return {
            error:false,
            contact:contact,
            user:user,
        };
    }
 
    static async update(newContact,contactId,request) {
        const connection = await this.#contactsConnection();
        await connection.updateDocument({_id:contactId},{$set:newContact});
    }
 
    static async delete(contactId,request) {
        const connection = await this.#contactsConnection();
        await connection.deleteDocument({_id:contactId});
    }
 
}

export default ContactsRepository;