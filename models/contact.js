import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    photo: {type: String, required:false}, //photo name (databaseden çekilecek)
    name: { type: String, required: true, validate: {
        validator: (value) => {
          if(value.length == 0) throw "Bir isim girmelisiniz."
        },
      }, 
    },
    lastName: { type: String, required: false},
    company: { type: String, required: false}, 
    phones: { type: Array, required: true, validate: {
        validator: (value) => {
          if(value.length == 0) throw "Bir telefon numarası girmelisiniz."
        },
      }, 
    }, //List<String>
    emails: { type: Array, required: false}, //List<String>
    ringtone: { type: String, required: false},
    texttone: { type: String, required: false},
    urls: { type: Array, required: false}, //List<String>
    addresses: { type: Array, required: true, validate: {
        validator: (value) => {
          if(value.length == 0) throw "Bir adres girmelisiniz."
        },
      }, 
    }, //List<String>
    birthday: { type: String, required: false},
    anniversary: { type: Object, required: false}, //{"firstDate":"08/12/2022", "anniversary":"01/01/2022"}
    relatedName: { type: Object, required: false}, //{"father":"Bob", "mother":"Aisha"}
    socialProfile: { type:Object, required: false}, //{"facebook":"www...","twitter":"www..."}
    instantMessage: { type:Object, required: false}, //{"skype":"","msn":""}
    notes: { type: String, required: false},
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;