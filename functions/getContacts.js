//.env
import dotenv from 'dotenv';
import connections from '../helpers/connections';
import connectionsClose from '../helpers/connectionsClose';
dotenv.config()


const getContacts = async (body) => {
    const connect = connections();
    var query = await connect.contacts.find({user:body.user});
    connectionsClose(connect);
    return query;
}

export default getContacts;