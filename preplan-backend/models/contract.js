import mongoose from 'mongoose';

const contractSchema = mongoose.Schema({
  maximumMinutesPerDay: {
    type: String,
    required: true,
  },
  tenantId: {
    type: Number,
  },
  contractId: {
    type: String
  }
});

const Contract = mongoose.model('Contract', contractSchema);
export { Contract }