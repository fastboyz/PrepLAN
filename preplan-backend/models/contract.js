import mongoose from 'mongoose';

const contractSchema = mongoose.Schema({
  maximumMinutesPerDay: {
    type: Number,
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
    type: Number
  },
  name: {
    type: String,
    required: true,
  }
}, { autoCreate: true});

const Contract = mongoose.model('Contract', contractSchema);
export { Contract }