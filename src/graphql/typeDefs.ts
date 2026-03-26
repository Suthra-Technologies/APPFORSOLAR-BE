import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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
