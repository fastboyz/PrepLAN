import mongoose from 'mongoose';

const skillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

const Skill = mongoose.model('Skill', skillSchema);
export { Skill }