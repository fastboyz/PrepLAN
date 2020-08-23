import mongoose from 'mongoose';

const contractSchema = mongoose.Schema({
  maximumMinutesPerDay: {
    type: String,
    required: true,
  },
  tenantId: {
    type: Number,
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edition"
  },
  contractId: {
    type: String
  },
  name: {
    type: String,
    required: true,
  }
});

const Contract = mongoose.model('Contract', contractSchema);
export { Contract }