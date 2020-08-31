import mongoose from 'mongoose';

const shiftSchema = mongoose.Schema({
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Edition'
  },
  shiftId: {
    type: Number
  }, 
  volunteerId: {
    type: Number
  }, 
}, { autoCreate: true});

const Shift = mongoose.model('Shift', shiftSchema);

export { Shift }