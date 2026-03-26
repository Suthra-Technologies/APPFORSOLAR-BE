import mongoose from 'mongoose';

const ProductionStatSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  kwh: { type: Number, required: true },
  systemId: { type: String, required: true, default: 'global' } // for future multi-system
}, { timestamps: true });

export const ProductionStat = mongoose.model('ProductionStat', ProductionStatSchema);
