import mongoose from 'mongoose';

const availabilitySchema = mongoose.Schema({
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    required: true,
  }, 
  tenantId: {
    type: Number
  }, 
  availabilityId: {
    type: Number
  }, 
  volunteerId: {
    type: Number
  }
});

const Availability = mongoose.model('Availability', availabilitySchema);
export { Availability }