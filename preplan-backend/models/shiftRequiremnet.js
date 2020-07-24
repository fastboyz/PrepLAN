import mongoose from 'mongoose';

const shiftRequirementSchema = mongoose.Schema({
    nbVolRequired: {
        type: Number,
        required: true
    },
    timeSlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
        require: true
    },
    edition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Edition"
    }
});

const ShiftRequirement = mongoose.model('ShiftRequirement', shiftRequirementSchema);
export { ShiftRequirement };
