import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: String, required: true },
    dictionary: { type: Array, required: true}, //List<Contact>
    }, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;