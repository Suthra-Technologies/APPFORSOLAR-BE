"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = require("./config/db");
const redis_1 = require("./config/redis");
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = require("./graphql/resolvers");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productionRoutes_1 = __importDefault(require("./routes/productionRoutes"));
const buildServer = async () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
    app.use((0, morgan_1.default)('dev'));
    // Database and Redis
    await (0, db_1.connectDB)();
    await (0, redis_1.connectRedis)();
    // REST API Routes
    app.use('/api/auth', authRoutes_1.default);
    app.use('/api/booking', bookRoutes_1.default);
    app.use('/api/production', productionRoutes_1.default);
    // GraphQL Setup
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        context: ({ req }) => ({ req })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app, path: '/graphql' });
    // HTTP Server & WebSockets
    const httpServer = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(httpServer, {
        cors: { origin: '*' }
    });
    io.on('connection', (socket) => {
        console.log('Client connected to websocket:', socket.id);
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
    // Attach io to global for easy access or pass it securely
    global.io = io;
    return { app, httpServer, io };
};
exports.buildServer = buildServer;
