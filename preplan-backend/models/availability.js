import mongoose from 'mongoose';

const availabilitySchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    required: true,
  }
});

const Availability = mongoose.model('Availability', availabilitySchema);
export { Availability }