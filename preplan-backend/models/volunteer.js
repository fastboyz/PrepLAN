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
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract'
  },
  availabilities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Availability'
  }],
  positions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position'
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