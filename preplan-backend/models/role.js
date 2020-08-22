import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

const Role = mongoose.model('Role', roleSchema);
export { Role };