import mongoose from 'mongoose';
import ValidateEmail from '../helpers/emailValidator.js';
import ValidatePhone from './../helpers/phoneValidator.js';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    _id: { type: String, required:false },
    user : { type: String, required:true },
    photo: { type: String, required:false }, //photo name (databaseden çekilecek)
    name: { type: String, required: [true,"Bir isim girmelisiniz"] },
    lastName: { type: String, required: false},
    company: { type: String, required: false}, 
    phones: { type: Array, required: true, validate: {
        validator: (value) => {
          if(value.length == 0) throw "Bir telefon numarası girmelisiniz."
          if(value.length == 1) {
            if(!ValidatePhone(value[0])) throw `[${value[0]}] telefon numarası geçerli bir Türkiye telefon numarası değil.`;
          } else {
            var nonValidatePhones = [];
            value.forEach((phone) => {
                if(!ValidatePhone(phone)) nonValidatePhones.push(phone);
            });
            if(nonValidatePhones.length != 0) throw `[${nonValidatePhones.toString()}] telefon numaraları geçerli bir Türkiye numarası değil.`
          }
        },
      }, 
    }, //List<String>
    emails: { type: Array, required: false, validate: {
        validator: (value) => {
            if(value.length == 1) {
                if(!ValidateEmail(value[0])) throw `[${value[0]}] adresi geçerli bir mail adresi değil.`;
              } else {
                var nonValidateMails = [];
                value.forEach((email) => {
                    if(!ValidateEmail(email)) nonValidateMails.push(email);
                });
                if(nonValidateMails.length != 0) throw `[${nonValidateMails.toString()}] adresleri geçerli bir mail adresi değil.`
              }
        }  
      },
    }, //List<String>
    addresses: { type: Array, required: true, validate: {
        validator: (value) => {
          if(value.length == 0) throw "Bir adres girmelisiniz."
        },
      }, 
    }, //List<String>
    notes: { type: String, required: false},
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;