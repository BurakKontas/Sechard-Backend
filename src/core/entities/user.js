import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: String, required: [true, "Bir ID girmelisiniz."] },
    //dictionary contact.name lerin tutulduğu bir array olacak 
    dictionary: { type: Array, default: [], required: true }, //List<String>
    }, {
  validateBeforeSave:true,
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;