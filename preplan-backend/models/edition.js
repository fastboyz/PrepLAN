import mongoose from 'mongoose';

const editionSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    isRegistering: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    location: {
        type: String,
        required: true
    },
});

const Edition = mongoose.model('Edition', editionSchema);
export { Edition };