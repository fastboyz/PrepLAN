import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    // editions: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Edition'
    //     }
    // ]
});

const Event = mongoose.model('Event', eventSchema);
export { Event };