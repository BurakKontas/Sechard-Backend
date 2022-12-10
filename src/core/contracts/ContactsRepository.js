//.env
import dotenv from 'dotenv';
dotenv.config()

import Contact from '../entities/contact.js';
import ValidateModel from '../helpers/validateModels.js';
import randomId from '../helpers/randomId.js';
import UsersRepository from './UsersRepository.js';
import MongoDB from './../entities/mongo.js';
import getUserIds from './../usecases/users/getUserIds.js';

class ContactsRepository {
    
    static async #contactsConnection() {
        return new MongoDB("sechard","contacts",process.env.MONGO_CONNECTION_STRING);
    }

    static async get(query,projection) {
        //dümdüz alıyoruz
        var ids = await getUserIds();
        if(!ids.includes(query.user)) throw { error:true,reason:["Bu ID de bir kullanıcı yok." ]};
        const connection = await this.#contactsConnection();
        var founded = await connection.find(query,projection);
        if(founded.length == 0) throw { error:true,reason:["Böyle bir contact bulunamadı"] };
        connection.close();
        return founded;
    }
 
    static async getAll(query,projection) {
        //dümdüz alıyoruz
        var ids = await getUserIds();
        if(!ids.includes(query.user)) throw { error:true,reason:["Bu ID de bir kullanıcı yok."] };
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
        var user = query[0];
        //aynı isimde biri daha var mı ?
        var ifHasName = user.dictionary.filter((contact) => contact == body.name);
        if(ifHasName.length > 0) {
            connection.close();
            throw { error:true,reason:[`[${body.name}] zaten ekli.`] };
        }
        
        //çok mümkün bir error değil ama koymakta fayda var.
        if(query.length == 0) {
            connection.close();
            throw { error:true,reason:[`[${body._id}] idsinde bir kullanıcı bulunamadı.`] };
        }
        //validate işlemlerini yapıyoruz
        const contact = new Contact(body);
        const validation = await ValidateModel(contact);
        if(validation.error == true) {
            connection.close();
            throw validation;
        }
        //burdan sonrasında valid contactımız ve userimiz var
        
        //crypto ile oluşturduğumuz id yi veriyoruz
        contact._id = randomId();
        await connection.insertDocument(contact);
        
        //userin dictionarysine ekliyoruz
        if(!user.dictionary) user.dictionary = [];
        //isimler unique olduğundan böyle birşey yapabilirim
        user.dictionary.push(contact.name);

        await UsersRepository.update(user.dictionary,body.user);
        connection.close();
        
        return {
            error:false,
            contact:contact,
            user:user,
        };
    }
 
    static async update(newContact,oldName,request) {
        const connection = await this.#contactsConnection();
        var contact = await ContactsRepository.get({name:oldName,user:newContact.user});
        contact = contact[0];
        //eğer name değiştiyse userdeki dictionarydeki nameyi de değiştirmemiz gerekiyor
        //contactın useri değiştirilemez !
        var user = await UsersRepository.get({_id:contact.user});
        user = user[0];
        var newDictionary = user.dictionary.map((value) => {
            if(value == oldName) return newContact.name;
            return value;
        })
        await UsersRepository.update(newDictionary,user._id);
        await connection.updateDocument({name:oldName,user:newContact.user},{$set:newContact});

        return { error:false }
    }
 
    static async delete(name,userId,request) {
        const connection = await this.#contactsConnection();
        var contact = await ContactsRepository.get({user:userId,name:name});
        //eğer name değiştiyse userdeki dictionarydeki nameyi de silmemiz gerekiyor
        //contactın useri değiştirilemez !
        var user = await UsersRepository.get({_id:userId});
        user = user[0];
        var newDictionary = user.dictionary.filter(element => element != name);
        await UsersRepository.update(newDictionary,user._id);

        await connection.deleteDocument({user:userId,name:name});

        return { error:false }
    }

    static async search(userId,text,projection) {
        const query = {user:userId,name:{$regex: text}}
        const cursor = await ContactsRepository.getAll(query,projection)
        return cursor;
    }
 
}

export default ContactsRepository;