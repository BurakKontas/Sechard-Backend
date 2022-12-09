//.env
import dotenv from 'dotenv';
dotenv.config()

import UserDTO from './../dtos/userDTO';
import User from './../entities/user';
import MongoDB from './../entities/mongo';
import ContactsRepository from './ContactsRepository';

class UsersRepository {
    
    static async #usersConnection() {
        return new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);
    }

    //getall yok çünkü neden tüm kullanıcıları istiyim ki ?
    static async get(query,projection) {
        //dümdüz alıyoruz
        const connection = await this.#usersConnection();
        var founded = await connection.find(query,projection);
        if(!founded) return {error:true,reason:"Böyle bir user bulunamadı"};
        connection.close();
        return founded;
    }

    static async create(body) {
        const connection = await this.#usersConnection();
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
 
    static async update(newUser,userId,request) {
        const connection = await this.#usersConnection();
        await connection.updateDocument({_id:userId},{$set:newUser});
    }
 
    static async delete(userId,request) {
        const connection = await this.#usersConnection();
        var user = UsersRepository.get({_id:userId});
        user.dictionary.forEach((name) => {
            //contactlarında silinmesi lazım o usere bağlı olan
            //gerçi bu fonksiyon kullanılmaz muhtemelen
            ContactsRepository.delete({user:userId,name:name})
        })
        await connection.deleteDocument({_id:userId});
    }
 
}

export default UsersRepository;