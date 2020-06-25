import mongoose from 'mongoose';

const VolunteerProfile = mongoose.model(
    'VolunteerProfile',
    new mongoose.Schema({
        userProfile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserProfile"
        },
    
        tshirtSize: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
    
        allergy: {
            type: String,
            required: false,
            unique: true,
            trim: true
        },
    
        certification: {
            type: String,
            required: false,
            unique: true,
            trim: true
        },
        
        emergencyContact: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EmergencyContact"
        }
    })
);

export {VolunteerProfile}