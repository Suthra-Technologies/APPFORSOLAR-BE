"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Booking_1 = require("../models/Booking");
const ProductionStat_1 = require("../models/ProductionStat");
exports.resolvers = {
    Query: {
        getDashStats: async () => {
            const totalBookings = await Booking_1.Booking.countDocuments();
            const pendingBookings = await Booking_1.Booking.countDocuments({ status: 'pending' });
            const lastPower = await ProductionStat_1.ProductionStat.findOne().sort({ createdAt: -1 });
            return {
                totalBookings,
                pendingBookings,
                livePower: lastPower ? lastPower.kwh : 52.4
            };
        },
        getBookings: async (_, { limit }) => {
            let query = Booking_1.Booking.find().sort({ createdAt: -1 });
            if (limit) {
                query = query.limit(limit);
            }
            return query;
        }
    }
};
