import mongoose from 'mongoose';
import { connectDB } from '../src/config/db';
import { describe, beforeAll, afterAll, it, expect } from '@jest/globals';

describe('Database Connection', () => {
  beforeAll(async () => {
    process.env.MONGO_URI = 'mongodb://localhost:27017/solar-saas-test';
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should be connected to database', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });
});
