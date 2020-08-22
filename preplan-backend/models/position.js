import mongoose from 'mongoose';

const positionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edition"
  },
  skillId: {
    type: Number
  },
  spotId: {
    type: Number
  }

});
const Position = mongoose.model('Position', positionSchema);
export { Position };