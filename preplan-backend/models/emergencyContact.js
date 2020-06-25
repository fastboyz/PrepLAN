import mongoose from 'mongoose';

const EmergencyContact = mongoose.model(
    'EmergencyContact',

    new mongoose.Schema({
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
        phoneNumber: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },
        relationship: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },
    })
);

export { EmergencyContact };





