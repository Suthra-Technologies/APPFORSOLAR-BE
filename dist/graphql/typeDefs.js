"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Booking {
    id: ID!
    fullName: String!
    phone: String!
    city: String!
    customerType: String!
    status: String!
    createdAt: String!
  }

  type ProductionStat {
    kwh: Float!
    timestamp: String!
  }

  type Query {
    getDashStats: DashStats!
    getBookings(limit: Int): [Booking!]!
  }

  type DashStats {
    totalBookings: Int!
    pendingBookings: Int!
    livePower: Float!
  }
`;
