import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    }
}); 

const Account = mongoose.model('Account', accountSchema);
export { Account };