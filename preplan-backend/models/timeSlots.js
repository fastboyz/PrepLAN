import mongoose from 'mongoose';

const timeSlotsSchema = mongoose.Schema({
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
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotsSchema);

export { TimeSlot }