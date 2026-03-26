"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
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
exports.Booking = mongoose_1.default.model('Booking', bookingSchema);
