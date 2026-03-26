import { Booking } from '../models/Booking';
import { ProductionStat } from '../models/ProductionStat';

export const resolvers = {
  Query: {
    getDashStats: async () => {
      const totalBookings = await Booking.countDocuments();
      const pendingBookings = await Booking.countDocuments({ status: 'pending' });
      const lastPower = await ProductionStat.findOne().sort({ createdAt: -1 });

      return {
        totalBookings,
        pendingBookings,
        livePower: lastPower ? lastPower.kwh : 52.4
      };
    },
    getBookings: async (_: any, { limit }: { limit?: number }) => {
      let query = Booking.find().sort({ createdAt: -1 });
      if (limit) {
        query = query.limit(limit);
      }
      return query;
    }
  }
};
