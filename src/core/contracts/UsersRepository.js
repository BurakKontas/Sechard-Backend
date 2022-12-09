//.env
import dotenv from 'dotenv';
dotenv.config()

import UserDTO from './../dtos/userDTO';
import User from './../entities/user';
import MongoDB from './../entities/mongo';

class UsersRepository {
    
    static async #usersConnection() {
        return new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);
    }

    static async get(query) {
        //dümdüz alıyoruz
        const connection = await this.#usersConnection();
        var founded = await connection.find(query);
        if(!founded) return {error:true,reason:"Böyle bir user bulunamadı"};
        var userdto = new UserDTO(founded[0]);
        connection.close();
        return userdto;
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
        await connection.deleteDocument({_id:userId});
    }
 
}

export default UsersRepository;