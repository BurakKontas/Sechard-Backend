import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactDTOSchema = new Schema({
    //burası data transfer object olduğundan validation a ihtiyacımız yok çünkü databaseden gelen veriyi buraya aktaracağız
    user : { type: String, required:true },
    photo: { type: String, required:false }, //photo name (databaseden çekilecek)
    name: { type: String, required: true },
    company: { type: String, required: false}, 
    phones: { type: Array, required: true },
    emails: { type: Array, required: false },
    addresses: { type: Array, required: true },
    notes: { type: String, required: false},
}, {
  timestamps: true,
});

const ContactDTO = mongoose.model('ContactDTO', contactDTOSchema);
export default ContactDTO;