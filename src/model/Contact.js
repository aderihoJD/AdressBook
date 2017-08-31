
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        min:2,
        max:32,
        required: true,
    },
    email: {
        min:2,
        max:32,
        type: String,
    },
    phone_number: {
        min:2,
        max:32,
        type: String,
    }
});


export default mongoose.model('contact', UserSchema);
