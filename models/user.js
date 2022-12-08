import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: Array, required: true, validate: {
        validator: (value) => {
          if(value.length == 0) throw "Bir ID girmelisiniz."
        },
      },
    },
    //dictionary contact._id lerin tutulduğu bir array olacak 
    dictionary: { type: Array, required: true, validate: {
        validator: (value) => {
          if(value.length == 0) throw "Bir ID listesi girmelisiniz."
        },
      }, 
    }, //List<Contact>
    }, {
  validateBeforeSave:true,
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;