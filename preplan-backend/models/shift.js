import mongoose from 'mongoose';

const shiftSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
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
});

const Shift = mongoose.model('Shift', shiftSchema);

export { Shift }