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

    static async get(query,projection) {
        //dümdüz alıyoruz
        const connection = await this.#contactsConnection();
        var founded = await connection.find(query,projection);
        if(founded.length == 0) return {error:true,reason:"Böyle bir contact bulunamadı"};
        connection.close();
        return founded;
    }
 
    static async getAll(query,projection) {
        //dümdüz alıyoruz
        const connection = await this.#contactsConnection();
        var founded = await connection.find(query,projection);
        connection.close();
        return founded;
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
        var contact = ContactsRepository.get({_id:contactId});
        //eğer name değiştiyse userdeki dictionarydeki nameyi de değiştirmemiz gerekiyor
        //contactın useri değiştirilemez !
        var user = await UsersRepository.get({_id:contact.user});
        var nameIndex = user.dictionary.findIndex(contact.name);
        user.dictionary[nameIndex] = newContact.name;
        await UsersRepository.update(user,user._id);
        await connection.updateDocument({_id:contactId},{$set:newContact});
    }
 
    static async delete(name,userId,request) {
        const connection = await this.#contactsConnection();
        var contact = ContactsRepository.get({user:userId,name:name});
        //eğer name değiştiyse userdeki dictionarydeki nameyi de silmemiz gerekiyor
        //contactın useri değiştirilemez !
        var user = await UsersRepository.get({_id:contact.user});
        var nameIndex = user.dictionary.findIndex(contact.name);
        user.dictionary.splice(nameIndex,1);
        await UsersRepository.update(user,user._id);

        await connection.deleteDocument({user:userId,name:name});
    }

    static async search(userId,text,projection) {
        const query = {user:userId,name:{$regex: text}}
        const cursor = await ContactsRepository.getAll(query,projection)
        return cursor;
    }
 
}

export default ContactsRepository;