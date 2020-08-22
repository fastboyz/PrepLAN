import mongoose from 'mongoose';

const Profile = mongoose.model(
  'Profile',
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true
    },

    tshirtSize: {
      type: String,
      required: true,
      trim: true
    },

    allergy: {
      type: String,
      trim: true
    },

    certification: {
      type: String,
      trim: true
    },

    emergencyContact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmergencyContact"
    }
  })
);

export { Profile }