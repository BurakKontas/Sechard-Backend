import MongoDB from "../models/mongo";
//.env
import dotenv from 'dotenv';
dotenv.config()

const connections = async () => {
    const connection = new MongoDB("sechard","users",process.env.MONGO_CONNECTION_STRING);
    const connectionContacts = new MongoDB("sechard","contacts",process.env.MONGO_CONNECTION_STRING);
    return {
        users:connection,
        contacts:connectionContacts
    }
}

export default connections;