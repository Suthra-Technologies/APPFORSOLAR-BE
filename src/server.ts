import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import bookRoutes from './routes/bookRoutes';
import authRoutes from './routes/authRoutes';
import productionRoutes from './routes/productionRoutes';
import configRoutes from './routes/configRoutes';
import contactRoutes from './routes/contactRoutes';

export const buildServer = async () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
  app.use(morgan('dev'));

  // Database and Redis
  await connectDB();
  await connectRedis();

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/booking', bookRoutes);
  app.use('/api/production', productionRoutes);
  app.use('/api/config', configRoutes);
  app.use('/api/contact', contactRoutes);
  
  const uploadRoutes = (await import('./routes/uploadRoutes')).default;
  app.use('/api/upload', uploadRoutes);

  // Swagger Documentation
  const { setupSwagger } = await import('./config/swagger');
  setupSwagger(app as any);

  // GraphQL Setup
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app as any, path: '/graphql' });

  // HTTP Server & WebSockets
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('Client connected to websocket:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Attach io to global for easy access or pass it securely
  (global as any).io = io;

  return { app, httpServer, io };
};
