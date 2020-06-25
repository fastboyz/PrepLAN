import mongoose from 'mongoose';

const UserProfile = mongoose.model(
    "UserProfile",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstName: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },

        birthday: {
            type: Date,
            required: true,
        },

        phoneNumber: {
            type: String,
            required: true,
            unique: false,
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
            unique: false,
            trim: true
        }
    })
);

export { UserProfile };