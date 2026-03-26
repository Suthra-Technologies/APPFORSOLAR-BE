import { buildServer } from './server';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5001;

buildServer().then(({ httpServer }) => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Solar Server ready at http://localhost:${PORT}`);
    console.log(`🔌 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}).catch(console.error);
