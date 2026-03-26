import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  address: { type: String, required: true },
  customerType: { type: String, enum: ['residential', 'commercial'], required: true },
  preferredCapacityKw: { type: String },
  notes: { type: String },
  roofType: { type: String, required: true },
  roofAreaSqFt: { type: String, required: true },
  shading: { type: String, required: true },
  haveExistingSolar: { type: String, enum: ['yes', 'no'], required: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);
