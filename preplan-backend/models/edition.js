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
    positions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position'
        }
    ],
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    }
});

const Edition = mongoose.model('Edition', editionSchema);
export { Edition };