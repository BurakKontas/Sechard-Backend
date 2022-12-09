//.env
import dotenv from 'dotenv';
dotenv.config()

import User from './../entities/user.js';
import MongoDB from './../entities/mongo.js';
import ContactsRepository from './ContactsRepository.js';
import getUserIds from './../usecases/users/getUserIds.js';

class UsersRepository {
    
    static async #usersConnection() {
        return new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);
    }

    //getall yok çünkü neden tüm kullanıcıları istiyim ki ?
    static async get(query,projection) {
        //dümdüz alıyoruz
        const connection = await this.#usersConnection();
        var founded = await connection.find(query,projection);
        if(founded.length == 0) throw {error:true,reason:"Böyle bir user bulunamadı"};
        connection.close();
        return founded;
    }

    static async create(body) {
        const connection = await this.#usersConnection();
        if(!body.id) throw { error:true, reason:"ID girilmedi" }
        var ids = await getUserIds();
        if(ids.includes(body.id)) throw { error:true, reason:"Bu ID'de bir kullanıcı zaten var" }
        var user = new User({
            _id:body.id,
            dictionary:[],
        });
        connection.insertDocument(user);
        return {
            error:false,
            user:user,
        }
    }
 
    static async update(dictionary,userId,request) {
        const connection = await this.#usersConnection();
        var ids = await getUserIds();
        if(!ids.includes(userId)) throw { error:true, reason:"Bu ID'de bir kullanıcı yok" }
        var user = new User({
            _id:userId,
            dictionary:dictionary
        });
        await connection.updateDocument({_id:userId},{$set:user});
        return { error:false }
    }
 
    static async delete(userId,request) {
        const connection = await this.#usersConnection();
        var ids = await getUserIds();
        if(!ids.includes(userId)) throw { error:true,"reason":"Böyle Bir ID bulunamadı." }
        var user = UsersRepository.get({_id:userId});
        if(user.dictionary && user.dictionary.length != 0) {
            user.dictionary.forEach((name) => {
                //contactlarında silinmesi lazım o usere bağlı olan
                //gerçi bu fonksiyon kullanılmaz muhtemelen
                ContactsRepository.delete({user:userId,name:name})
            })
        }
        await connection.deleteDocument({_id:userId});
        return { error:false }
    }
 
}

export default UsersRepository;