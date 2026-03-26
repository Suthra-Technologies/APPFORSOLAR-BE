"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionStat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductionStatSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date, default: Date.now },
    kwh: { type: Number, required: true },
    systemId: { type: String, required: true, default: 'global' } // for future multi-system
}, { timestamps: true });
exports.ProductionStat = mongoose_1.default.model('ProductionStat', ProductionStatSchema);
