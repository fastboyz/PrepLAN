import mongoose from 'mongoose';

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        birthday: {
            type: Date,
            required: true,
        },

        phoneNumber: {
            type: String,
            required: true,
            trim: true
        },

        discord: {
            type: String,
            required: false,
            unique: true,
            trim: true
        },

        pronoun: {
            type: String,
            required: true,
            trim: true
        }
    })
);

export { User };