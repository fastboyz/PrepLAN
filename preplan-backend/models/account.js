import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({

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
    }
});

const Account = mongoose.model('Account', accountSchema);
export { Account };