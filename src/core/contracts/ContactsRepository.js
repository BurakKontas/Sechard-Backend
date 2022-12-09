import connections from '../helpers/connections';
import connectionsClose from '../helpers/connectionsClose';
import Contact from '../entities/contact';
import ValidateModel from '../helpers/validateModels';
import randomId from '../helpers/randomId';
import ContactDTO from './../dtos/contactDTO';

class ContactsRepository {
    static async get(request,Id) {
        //dümdüz alıyoruz
        const connect = connections();
        var query = await connect.contacts.findOne({user:request.body.user,_id:Id});
        if(!query) return {error:true,reason:"Böyle bir contact bulunamadı"};
        var contactdto = new ContactDTO(query);
        connectionsClose(connect);
        return contactdto;
    }
 
    static async getAll(request) {
        //dümdüz alıyoruz
        const connect = connections();
        var query = await connect.contacts.find({user:request.body.user});
        var dtos = [];
        query.map((contact) => {
            dtos.push(new ContactDTO(contact));
        })
        connectionsClose(connect);
        return dtos;
    }
 
    static async create(request) {
        //bağlantılar
        var body = request.body;
        const connect = await connections();

        //gerekli dökümanları buluyoruz
        var query = await connect.users.find({_id:body.user});
        var user = query[0];

        //aynı isimde biri daha var mı ?
        var ifHasName = user.dictionary.filter((contact) => contact.name == body.name);
        if(ifHasName.length > 1) {
            connectionsClose(connect);
            return { error:true,reason:`[${body.name}] zaten ekli.` };
        }

        //çok mümkün bir error değil ama koymakta fayda var.
        if(query.length == 0) {
            connectionsClose(connect);
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
        if(!user.dictionary) user.dictionary = [];
        user.dictionary.push(contact._id);
        await connect.users.updateDocument({_id:body.user},{$set:user});

        connectionsClose(connect);

        return {
            error:false,
            contact:contact,
            user:user,
        };
    }
 
    static async update(request,Id) {
        return new Error('not implemented');
    }
 
    static async delete(request,userId) {
        return new Error('not implemented');
    }
 
}

export default ContactsRepository;