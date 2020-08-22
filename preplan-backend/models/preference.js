import mongoose from 'mongoose';

const preferenceSchema = mongoose.Schema({
  dailyMaxHours: {
    type: String
  },
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],
});

const Preference = mongoose.model('Preference', preferenceSchema);
export { Preference }