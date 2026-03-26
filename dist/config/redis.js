"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});
exports.redisClient.on('error', (err) => console.log('❌ Redis Client Error', err));
const connectRedis = async () => {
    try {
        await exports.redisClient.connect();
        console.log('✅ Redis Connected');
    }
    catch (error) {
        console.log('❌ Redis Connection Failed', error);
    }
};
exports.connectRedis = connectRedis;
