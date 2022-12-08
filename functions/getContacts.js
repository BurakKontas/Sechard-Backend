import connections from '../helpers/connections';
import connectionsClose from '../helpers/connectionsClose';


const getContacts = async (body) => {
    //dümdüz alıyoruz
    const connect = connections();
    var query = await connect.contacts.find({user:body.user});
    connectionsClose(connect);
    return query;
}

export default getContacts;