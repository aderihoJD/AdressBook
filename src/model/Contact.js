
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone_number: {
        type: String
    }
});


export default mongoose.model('contact', UserSchema);
