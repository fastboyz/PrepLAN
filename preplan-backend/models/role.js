import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, { autoCreate: true});

const Role = mongoose.model('Role', roleSchema);
export { Role };