import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userDTOSchema = new Schema({
    _id: { type: String, required: true },
    dictionary: { type: Array, default:[] , required: true },
  }, {
  timestamps: true,
});

const UserDTO = mongoose.model('UserDTO', userDTOSchema);
export default UserDTO;