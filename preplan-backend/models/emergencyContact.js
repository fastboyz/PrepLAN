import mongoose from 'mongoose';

const EmergencyContact = mongoose.model(
  'EmergencyContact',

  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },

    relationship: {
      type: String,
      required: true,
      trim: true
    },
  }, { autoCreate: true })
);

export { EmergencyContact };





