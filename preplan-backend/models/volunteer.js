import mongoose from 'mongoose';

const volunteerSchema = mongoose.Schema({
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    edition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Edition'
    },
    preference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Preference'
    },
    availabilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Availability'
    }],
    inscriptionDate: {
        type: Date,
        required: true,
    },
    lastUpdated: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    plannerId: {
        type: Number,
    }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
export { Volunteer }